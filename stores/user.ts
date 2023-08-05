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
    } as UserState),
    actions: {
        async getAllPosts() {
            let res = await useFetch<Post[]>('/api/get-all-posts')
            this.posts = res.data.value as Post[]
            return res.data
        }
    }
})