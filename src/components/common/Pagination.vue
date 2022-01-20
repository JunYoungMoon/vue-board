<template>
    <div>
        <ul>
            <li v-if="page > 1" @click="emitList(1)">처음</li>
            <li v-if="page > 1" @click="emitList(page - 1)">이전</li>
            <list v-for="item in pageList" :key="item">
                <li @click="emitList(item)" v-if="item === page">
                    <b>{{ item }}</b>
                </li>
                <li @click="emitList(item)" v-else>
                    {{ item }}
                </li>
            </list>
            <li v-if="page < totalPage" @click="emitList(page + 1)">다음</li>
            <li v-if="page < totalPage" @click="emitList(totalPage)">끝</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            totalPage: 0,
            pageList: [],
        };
    },
    props: {
        pageObject: {
            Object,
            required: true,
        },
    },
    watch: {
        pageObject: {
            deep: true,
            handler() {
                this.pageCount(this.page, this.pageObject.totalCount);
            },
        },
    },
    methods: {
        emitList(page) {
            this.page = page;
            this.pageCount(page, this.pageObject.totalCount);
            this.$emit("emitList", page);
        },
        pageCount(page, totalCount) {
            let totalPage = Math.floor(totalCount / this.pageObject.countList);

            if (totalCount % this.pageObject.countList > 0) {
                totalPage++;
            }

            this.totalPage = totalPage;

            if (page > totalPage) {
                page = totalPage;
            }

            let startPage =
                Math.floor((page - 1) / this.pageObject.countPage) *
                    this.pageObject.countPage +
                1;

            let endPage = startPage + this.pageObject.countPage - 1;

            if (endPage > totalPage) {
                endPage = totalPage;
            }

            this.pageList = [];

            for (let i = startPage; i <= endPage; i++) {
                this.pageList.push(i);
            }
        },
    },
};
</script>

<style scoped>
ul {
    list-style: none;
}
li {
    float: left;
    margin-right: 10px;
    cursor: pointer;
}
</style>
