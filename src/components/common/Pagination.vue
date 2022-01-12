<template>
    <div>
        <ul>
            <li v-if="page > 1" @click="emitList(1)"><a href="#">처음</a></li>
            <li v-if="page > 1" @click="emitList(page - 1)"><a href="#">이전</a></li>
            <list v-for="item in pageList" :key="item">
                <li @click="emitList(item)" v-if="item === page">
                    <b>{{ item }}</b>
                </li>
                <li @click="emitList(item)" v-else>
                    {{ item }}
                </li>
            </list>
            <li v-if="page < totalPage" @click="emitList(page + 1)">
                <a href="#">다음</a>
            </li>
            <li v-if="page < totalPage" @click="emitList(totalPage)">
                <a href="#">끝</a>
            </li>
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
        totalCount: {
            type: Number,
            required: true,
        },
        countPage: {
            type: Number,
            required: true,
        },
        countList: {
            type: Number,
            required: true,
        },
    },
    watch: {
        totalCount: function () {
            this.pageCount(this.page, this.totalCount);
        },
    },
    methods: {
        emitList(page) {
            this.page = page;
            this.pageCount(page, this.totalCount);
            this.$emit("emitList", page);
        },
        pageCount(page, totalCount) {
            let totalPage = Math.floor(totalCount / this.countList);

            if (totalCount % this.countList > 0) {
                totalPage++;
            }

            this.totalPage = totalPage;

            if (page > totalPage) {
                page = totalPage;
            }

            let startPage = Math.floor((page - 1) / this.countPage) * this.countPage + 1;

            let endPage = startPage + this.countPage - 1;

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
}
</style>
