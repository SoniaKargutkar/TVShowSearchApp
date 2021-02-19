const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault();
        const userSearchTerm = form.elements.query.value;
        const config = { params: { q: userSearchTerm, isFunny: 'Sonia' }, header: {} };
        //const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${userSearchTerm}`);
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        displayShows(res.data, userSearchTerm);
        form.elements.query.value = '';
    }
    catch {
        console.log("Error!!!  ", e);
    }

})

const displayShows = (shows, searchTerm) => {
    //deleting previously searched images
    const oldImgs = document.querySelectorAll('.searchedImgs')
    if (oldImgs) {
        for (let image of oldImgs) {
            image.parentNode.removeChild(image);
        }
    }
    // displaying newly searched images
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            img.classList.add('searchedImgs');
            document.body.append(img);
        }
    }
}