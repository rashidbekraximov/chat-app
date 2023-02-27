import type { StoreData } from "@/types/StoreData";
import type { Store } from "vuex";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { onPrivateMessageReceived, onPublicMessageReceived } from "./Message";

export const registerUser = (store: Store<StoreData>, username: string) => {
  store.state.username = username;

  const sock = new SockJS("http://localhost:8080/ws");
  store.state.stompClient = over(sock);
  store.state.stompClient.connect({}, () => onConnected(store), onError);
};

const onConnected = (store: Store<StoreData>) => {
  store.state.isConnected = true;
  store.state.stompClient?.subscribe("/chatroom/public", (payload) =>
    onPublicMessageReceived(store, payload)
  );
  store.state.stompClient?.subscribe(
    `/user/${store.state.username}/private`,
    (payload) => onPrivateMessageReceived(store, payload)
  );
};

const onError = (err: any) => {
  console.log(err);
};
