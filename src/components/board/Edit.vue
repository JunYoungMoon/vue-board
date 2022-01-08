<template>
    <div class="form-wrapper">
        <form @submit.prevent="editForm" class="form">
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
            <button type="submit" class="btn">수정</button>
            <button @click="$router.go(-1)">취소</button>
        </form>
    </div>
</template>

<script>
import { fetchView, fetchEdit } from "@/api/index";

export default {
    data() {
        return {
            title: "",
            contents: "",
        };
    },
    methods: {
        setForm({ title, contents }) {
            this.title = title;
            this.contents = contents;
        },
        async editForm() {
            try {
                const id = this.$route.params.id;
                const response = await fetchEdit(id, {
                    title: this.title,
                    contents: this.contents,
                });

                if (response.statusText === "OK") {
                    await this.$router.push("/");
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
    async created() {
        try {
            const id = this.$route.params.id;
            const response = await fetchView(id);
            this.setForm(response.data);
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style scoped></style>
