<template>
    <div class="z-50 bottom-0 h-full w-full">
        <div class="py-2 w-full">
            <div class="flex items-center justify-between">

                <div class="flex items-center text-white">
                    <img class="rounded-full h-[35px]" :src="post.image">
                    <div class="ml-2 font-semibold text-[18px]">{{ post.name }}</div>
                </div>

                <div v-if="user && user.identities![0].user_id == post.userId" @click="isMenu = !isMenu" class="relative">
                    <button :disabled="isDeleting"
                        class="flex items-center text-white p-1 h-[24px] w-[24px] hover:bg-gray-800 rounded-full cursor-pointer"
                        :class="isMenu ? 'bg-gray-800' : ''">
                        <Icon v-if="!isDeleting" name="bi:three-dots" color="#fff" size="18" />
                        <Icon v-else name="eos-icons:bubble-loading" color="#fff" size="18" />
                    </button>

                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                        <button @click="deletePost(post.id, post.picture)"
                            class="flex items-center rounded gap-2 text-red-500 justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900">
                            <div>Delete</div>
                            <Icon name="solar:trash-bin-trash-broken" size="20" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="relative flex items-center w-full">
                <div class="w-[42px] mx-auto">
                    <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full" />
                </div>

                <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm w-full font-light">
                    <div class="py-2 text-gray-300">
                        {{ post.text }}
                    </div>
                    <img v-if="post && post.picture" class="mx-auto w-full mt-2 pr-2 rounded"
                        :src="runtimeConfig.public.bucketUrl + post.picture" />

                    <div class="absolute mt-2 w-full ml-2">
                        <button :disabled="isLike" class="flex items-center gap-1">
                            <Icon class="p-1 text-white hover:bg-gray-800 rounded-full cursor-pointer"
                                name="mdi:cards-heart-outline" size="28" />
                        </button>
                        <div class="relatiuve text-sm text-gray-500">
                            <div>
                                <span>4</span>
                                likes
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="relative inline-block text-gray-500 pt-1 pb-1.5">
                <div class="flex items center">
                    <div class="flex items-center flex-wrap text-white gap-1 w-[42px]">
                        <div class="flex gap-0.5">
                            <img class="rounded-full h-[14px] mt-2" src="https://picsum.photos/id/202/50" />
                            <img class="rounded-full h-[17px]" src="https://picsum.photos/id/223/50" />
                        </div>
                        <div class="flex items-center">
                            <img class="rounded-full h-[11px] ml-4" src="https://picsum.photos/id/99/50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="h-[1px] bg-gray-800 w-full mt-3" />
    </div>
</template>

<script setup lang="ts">
import { Post } from '~/types/post'
import { useUserStore } from '~/stores/user';

const user = useSupabaseUser()

const runtimeConfig = useRuntimeConfig()
let isMenu = ref(false)
let isLike = ref(true)
let isDeleting = ref(false)

const emit = defineEmits(['isDeleted'])
interface PostCardProps {
    post: Post;
}
const props = defineProps<PostCardProps>()

const userStore = useUserStore()
const client = useSupabaseClient()

const hasLikedComputed = computed(() => {
    if (!user.value) return
    let res = false

    props.post.likes.forEach(like => {
        if (like.userId == user.value?.identities![0].user_id && like.postId == props.post.id) {
            res = true
        }
    })

    return res
})

const deletePost = async (id: number, picture: string) => {
    let res = confirm('Are you sure want to delete this post?')

    if (!res) return

    try {
        isMenu.value = !isMenu
        isDeleting.value = true

        if (picture != '') {
            const { data, error } = await client.storage.from('threads-clone-files').remove([picture])
            console.log({ data, error });
        }
        
        await useFetch(`/api/delete-post/${id}`, { method: 'DELETE' })
        emit('isDeleted', true)

        isDeleting.value = false

        await userStore.getAllPosts()
    } catch (error) {
        console.log(error);
        isDeleting.value = false
    }
}
</script>