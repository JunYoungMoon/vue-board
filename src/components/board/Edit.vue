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
            <button type="button" @click="$router.go(-1)">취소</button>
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

                if (response.status === 200) {
                    await this.$router.push("/");
                } else {
                    throw "글수정 실패";
                }
            } catch (error) {
                alert(error);
            }
        },
    },
    async created() {
        try {
            const id = this.$route.params.id;
            const response = await fetchView(id);
            if (response.status === 200) {
                this.setForm(response.data);
            } else {
                throw "글 가져오기 실패";
            }
        } catch (error) {
            alert(error);
        }
    },
};
</script>

<style scoped></style>
