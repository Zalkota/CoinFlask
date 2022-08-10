import axios from "axios";

const swapiGetter = (id) =>
    axios
        .get('https://swap.dev/api/people/${id}/')
        .then((res) => res.data.name)
        .catch((err) => console.error(err));

export default swapiGetter;
