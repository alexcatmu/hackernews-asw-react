export default function isLikedForUser(element) {
    return element.user_id.toString() === localStorage.getItem('user_id');
}
