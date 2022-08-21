import axios from 'axios';

function registerUser(url, data, headers){
    const res = axios.post(url, data, { headers: headers})
    .then(res => res);
    return res;
}

function redirectUser(url, headers){
    const res = axios.get(url, { headers: headers })
            .then(res => res);
    return res;

                
}

function getAllOrgans(url, headers){

    const res = axios.get(url, { headers })
            .then(res=> res);
    return res;

}

function handleOrganDelete(url, headers, data){
    axios.delete(url, {headers: headers, data: data})
}


function createOrgan(url, headers, data){
    return axios.post(url, data, { headers: headers}).then(res => res);
}

function userLogin(url, data, headers){
    return axios.post(url, data, {headers: headers})
        .then(res => res);

}

function getAllBlogs(url, headers){
    const res = axios.get(url, {headers: headers})
        .then(res => res);
        return res;
}

function getAllImages(files, url_fileDownload, headers){
    axios
    .all(files.map(file => 
        (this.getData(url_fileDownload, file.photo._id, file.photo.filename, headers))))
        .then(res => console.log(res.data))
        .catch((err) => console.log(err));

}

function createBlog(url, data, headers){
    axios.post(url, data, {headers: headers})
    .then(res => {
        return res;
    })
}

function updateList(data, headers){
    axios.put('http://localhost:3000/api/users/', data, {headers: headers})
    .then(res => {
        return res;
    })
}


export {registerUser, redirectUser, getAllOrgans, 
    handleOrganDelete, createOrgan, userLogin, getAllBlogs, getAllImages,
    createBlog, updateList};