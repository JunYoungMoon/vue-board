<template>
    <div>
        <ul v-if="listItems">
            <li v-for="item in listItems" :key="item.id">
                <div class="post-title">
                    <router-link :to="`/view/${item.id}`">{{ item.title }}</router-link>
                </div>
            </li>
        </ul>
        <Pagination
            v-if="totalCount !== 0"
            @emitList="setList"
            :totalCount="totalCount"
        ></Pagination>
        <br />
        <button @click="$router.push('/write')">글쓰기</button>
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
            totalCount: 0,
            page: 0,
        };
    },
    methods: {
        async setList(page) {
            this.page = page;
            const response = await fetchList(page, 5);
            this.totalCount = response.headers["x-total-count"];
            this.listItems = response.data;
        },
    },
    created() {
        this.setList(1);
    },
};
</script>

<style scoped></style>
