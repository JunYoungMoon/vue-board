import axios from "axios";

//리스트
function fetchList(page, countPage) {
    let startCount = (page - 1) * countPage;

    let endCount = page * countPage;

    return axios.get(
        `${process.env.VUE_APP_API_URL}?_sort=id&_order=DESC&_start=${startCount}&_end=${endCount}`,
    );
}

//상세화면
function fetchView(id) {
    return axios.get(`${process.env.VUE_APP_API_URL}/${id}`);
}

//글작성
function fetchWrite(data) {
    return axios.post(`${process.env.VUE_APP_API_URL}/`, data);
}

//글수정
function fetchEdit(id, data) {
    return axios.patch(`${process.env.VUE_APP_API_URL}/${id}`, data);
}

//글삭제
function fetchDelete(id) {
    return axios.delete(`${process.env.VUE_APP_API_URL}/${id}`);
}

export { fetchList, fetchView, fetchWrite, fetchEdit, fetchDelete };
