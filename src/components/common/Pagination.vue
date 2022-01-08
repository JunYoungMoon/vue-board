<template>
    <div>
        <ul>
            <li v-if="page > 1" @click="emitList(1)"><a href="#">처음</a></li>
            <li v-if="page > 1" @click="emitList(page - 1)"><a href="#">이전</a></li>
            <list v-for="item in pageList" :key="item">
                <li @click="emitList(item)" v-if="item === page">
                    <a href="#">
                        <b>{{ item }}</b>
                    </a>
                </li>
                <li @click="emitList(item)" v-else>
                    <a href="#">
                        {{ item }}
                    </a>
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
    },
    methods: {
        emitList(page) {
            this.page = page;
            this.pageCount(page, this.totalCount);
            this.$emit("emitList", page);
        },
        pageCount(page, totalCount) {
            let countList = 5;
            let countPage = 5;
            let totalPage = Math.floor(totalCount / countList); //32 / 5 = 6.2

            //자투리 페이지 추가 32 % 5 = 2
            if (totalCount % countList > 0) {
                totalPage++;
            }

            this.totalPage = totalPage;

            // 현재 페이지 > 총페이지 갯수
            if (page > totalPage) {
                page = totalPage;
            }

            //시작 페이지
            let startPage = Math.floor((page - 1) / 5) * 5 + 1;

            //끝 페이지
            let endPage = startPage + countPage - 1;

            //끝페이지 > 총페이지 갯수
            if (endPage > totalPage) {
                endPage = totalPage;
            }

            this.pageList = [];

            for (let i = startPage; i <= endPage; i++) {
                this.pageList.push(i);
            }
        },
    },
    created() {
        this.emitList(1);
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
