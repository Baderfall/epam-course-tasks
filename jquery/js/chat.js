(function(){
    $(document).ready(() => {
    
        $('#add-dlg-button').click(() => {
            let newUserName = $('#new-user-name').val();
            let item = `<li>
            <a href=""><img class="avatar" src="./img/default_user.png" alt="Profile photo"></a>
            <h3>${newUserName}</h3>
            <p class="message"></p>
            </li>`;

            $('.message-list').prepend(item);
            $('.message-list li').last().remove();
        });
    
        $('#new-user-name').keypress((event) => {
            if (event.which === 13) {
                $('#add-dlg-button').click();
            }
        });
    
    });
}());