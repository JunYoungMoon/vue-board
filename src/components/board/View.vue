<template>
    <div class="form-wrapper">
        <div>제목 : {{ title }}</div>
        <div>내용 : {{ contents }}</div>
        <button @click="this.$router.push(`/edit/${id}`)">수정</button>
        <button @click="remove()">삭제</button>
        <button @click="$router.go(-1)">목록</button>
    </div>
</template>

<script>
import { fetchView, fetchDelete } from "@/api/index";

export default {
    data() {
        return {
            id: "",
            title: "",
            contents: "",
        };
    },
    methods: {
        async remove() {
            try {
                const response = await fetchDelete(this.id);

                if (response.statusText === "OK") {
                    await this.$router.push("/");
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        try {
            this.id = this.$route.params.id;
            const response = await fetchView(this.id);
            this.title = response.data.title;
            this.contents = response.data.contents;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style scoped></style>
