import Client from "../client/client";
import Chatroom from "./chatroom";
import { ENDPOINTS } from "../rest/constants";
import { randomBytes } from 'crypto';
import user from "./user";

interface Message {
    id: string;
    message: string;
    chatroom_id: string;
    user: any;
    username: string
}

interface User {
    id: string;
    name: string;
    username: string;
    profile_thumb: string;
}

class User implements User {
    constructor(user: User, client: Client) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.profile_thumb = user.profile_thumb;
    }   
}

class Message implements Message {
    [x: string]: any;
    chatroom: Chatroom;
    client: Client;
    
    
    constructor( message: any,  client: Client) {
        this.id = message.id;
        this.message = message.message;
        this.chatroom_id = message.chatroom_id;
        this.user = message.user;
        this.chatroom = client.chatrooms.get(this.chatroom_id);
        this.client = client;
    }


    reply({ content } : { content: string }) {
        this.client.rest.fetcher.post(ENDPOINTS.sendChatMessaage, {
            chatroom_id: this.chatroom_id,
            created_at:  Math.round(Date.now() / 1000),
            message: content,
            id: randomBytes(32).toString("hex"),
            replied_to: {
                id: this.id,
                message: this.message,
                username: this.user.username
            }
        }).then(res => {
            console.log(res.data);
        });
    }

    react(reaction: string) {
        this.client.rest.fetcher.post(ENDPOINTS.sendChatReaction, {
            chatroom_id: this.chatroom_id,
            message_id: this.id,
            reaction: reaction,
        }).then(res => {
            console.log(res.data);
        });
    }
}

export default Message;