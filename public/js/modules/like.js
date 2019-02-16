import axios from 'axios';
import { $ } from './bling';

function ajaxLike(event) {
    event.preventDefault();
    console.log('like it');
    axios
        .post(this.action)
        .then(res => {
            const isLiked = this.like.classList.toggle('isLiked');
            $('.likes-count').textContent = res.data.likes.length;
        })
        .catch(console.error);
}

export default ajaxLike;