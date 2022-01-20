<template>
    <div>
        <ul v-if="listItems">
            <li v-for="item in listItems" :key="item.id">
                <div class="post-title">
                    <router-link :to="`/view/${item.id}`">{{ item.title }}</router-link>
                </div>
            </li>
        </ul>
        <Pagination @emitList="setList" :pageObject="pageObject"></Pagination>
        <br />
        <button type="button" @click="$router.push('write')">글쓰기</button>
    </div>
</template>

<script>
import Pagination from "../common/Pagination";
import { fetchList } from "../../api";

export default {
    components: { Pagination },
    data() {
        return {
            listItems: [],
            page: 1,
            pageObject: {
                totalCount: 0,
                countPage: 5,
                countList: 10,
            },
        };
    },
    methods: {
        async setList(page) {
            try {
                this.page = page;
                const response = await fetchList(page, this.pageObject.countList);
                if (response.status === 200) {
                    this.pageObject.totalCount = response.headers["x-total-count"];
                    this.listItems = response.data;
                } else {
                    throw "리스트 불러오기 실패";
                }
            } catch (error) {
                alert(error);
            }
        },
    },
    created() {
        this.setList(1);
    },
};
</script>

<style scoped></style>
