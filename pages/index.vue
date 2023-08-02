<template>
    <MainLayout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Posts" class="px-4 max-w-[600px] mx-auto">
                    <div v-if="isPosts">
                        <div v-for="post in posts" :key="post.name">
                            <PostCard :post="post" @isDeleted="posts = []" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue'

import { Post } from '~/types/post'

import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

let posts = ref<Post[]>([])
let isPosts = ref(false)
let isLoading = ref(false)

onBeforeMount(() => {
    isPosts.value = true
    posts.value = [
        {
            name: 'Jogn Weeks Dev',
            image: 'http://placehold.co/100',
            text: 'This is the title',
            picture: 'http://placehold.co/500',
        }
    ]
})
</script>