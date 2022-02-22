// hide and show the suggested input field
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('suggested-questions').style.display = "none";
    document.getElementById('suggest').addEventListener('change', function() {
        var suggested = document.getElementById('suggested-questions');
        if (suggested.style.display === 'none') {
            suggested.style.display = "block";
        } else {
            suggested.style.display == "none";
        }
    })
});