<template>
    <div class="form-wrapper">
        <form @submit.prevent="writeForm" class="form">
            <div>
                <label for="title">Title</label>
                <input id="title" type="text" v-model="title" />
            </div>
            <div>
                <label for="contents">Contents</label>
                <textarea
                    name="contents"
                    id="contents"
                    cols="30"
                    rows="5"
                    v-model="contents"
                ></textarea>
            </div>
            <button type="submit" class="btn">작성</button>
            <button type="button" @click="$router.go(-1)">취소</button>
        </form>
    </div>
</template>

<script>
import { fetchWrite } from "@/api/index";

export default {
    data() {
        return {
            title: "",
            contents: "",
        };
    },
    methods: {
        async writeForm() {
            try {
                const response = await fetchWrite({
                    title: this.title,
                    contents: this.contents,
                });

                if (response.status === 201) {
                    await this.$router.push("/");
                } else {
                    throw "글쓰기 실패";
                }
            } catch (error) {
                alert(error);
            }
        },
    },
};
</script>

<style scoped></style>
