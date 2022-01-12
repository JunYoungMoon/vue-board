<template>
    <div class="form-wrapper">
        <div>제목 : {{ title }}</div>
        <div>내용 : {{ contents }}</div>
        <button type="button" @click="this.$router.push(`/edit/${id}`)">수정</button>
        <button type="button" @click="remove()">삭제</button>
        <button type="button" @click="$router.push('/')">목록</button>
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

                if (response.status === 200) {
                    await this.$router.push("/");
                } else {
                    throw "삭제실패";
                }
            } catch (error) {
                alert(error);
            }
        },
    },
    async created() {
        try {
            this.id = this.$route.params.id;
            const response = await fetchView(this.id);
            if (response.status === 200) {
                this.title = response.data.title;
                this.contents = response.data.contents;
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
