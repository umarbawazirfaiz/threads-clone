import { defineStore } from "pinia";
import { Post } from "types/post";

export interface UserState {
    posts: Post[]
    isMenuOverlay: boolean
    isLogoutOverlay: boolean
}

export const useUserStore = defineStore('user', {
    state: () => ({
        posts: [],
        isMenuOverlay: false,
        isLogoutOverlay: false
    } as UserState)
})