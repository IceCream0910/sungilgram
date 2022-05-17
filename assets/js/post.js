// url 에서 parameter 추출
function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

const id = getParam('id');
switch (id) {
    case '1':
        $('#picture').attr('src', 'assets/img/1.png');
        $('#caption').html(`<b>UpSpec_official</b>&nbsp;This service is temporarily borrowing resources (CPU, RAM) from another user's computer that is not used at that time so that they can be used as a resource for your computer. <br>You have to pay the cost based on performance level and usage time. Sharer who provides resources can earn a profit.<br><a>#sharing_performance #grid_computing #free_at_first</a>`)
        break;
    case '2':
        $('#picture').attr('src', 'assets/img/2.png');
        $('#caption').html(`<b>UpSpec_official</b>&nbsp;This service is temporarily borrowing resources (CPU, RAM) from another user's computer that is not used at that time so that they can be used as a resource for your computer.

        <br>The algorithm matches the unused PC has the performance you want and sharing will be started on approval.<br><a>#sharing_performance #grid_computing #free_at_first</a>`)

        break;
    case '3':
        $('#picture').attr('src', 'assets/img/3.png');
        $('#caption').html(`<b>UpSpec_official</b>&nbsp;Suppose that you want to create a temporary pleasant working environment when you have to do heavy work (video editing, 3d graphics, etc.) but because you don't always do high-performance work, buying a high-performance PC is a burden.<Br>Without this service, you would waste your money and time buying a new computer or finding a high-performance PC.<br><a>#sharing_performance #grid_computing #free_at_first</a>`)

        break;
    case '4':
        $('#picture').attr('src', 'assets/img/4.png');
        $('#caption').html(`<b>UpSpec_official</b>&nbsp;Now say hello to UpSpec, a whole new form of shared economy platform.<br>You can use it at a 50% discount when you use it for the first time.<br><a>#sharing_performance #grid_computing #free_at_first</a>`)

        break;
    default:
        alert('잘못된 접근입니다.');
        break;
}

const firebaseConfig = {
    apiKey: "AIzaSyDYP_E985SFhK4yKTi5iuT7zi9PrMGEMYo",
    authDomain: "sungilgram.firebaseapp.com",
    projectId: "sungilgram",
    storageBucket: "sungilgram.appspot.com",
    messagingSenderId: "266266347186",
    appId: "1:266266347186:web:1daf0933f0656fadac2bab",
    measurementId: "G-S3H6YTCVQV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//좋아요/댓글 실시간 가져오기
db.collection("posts").doc(getParam('id'))
    .onSnapshot((doc) => {
        $('#likes-cnt').text(doc.data().likes);
    });

var btn1 = document.querySelector('#like-btn');

btn1.addEventListener('click', function () {
    var data = {
        likes: firebase.firestore.FieldValue.increment(1)
    };
    db.collection('posts').doc(getParam('id')).update(data).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })

});


//댓글 실시간 가져오기
db.collection("posts").doc(getParam('id')).collection('comments').orderBy("date")
    .onSnapshot((querySnapshot) => {
        $('#commentList').html('');
        $('#comment_cnt').html('댓글 ' + querySnapshot.size + '개');

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            $('#commentList').prepend(`<div style="display:flex;width:100%;">
            <img src="assets/img/sungil.png" style="border-radius:50%;width:50px;height:50px;" />
            <div style="margin-left:10px;">
                <b>`+ doc.data().username + `</b>&nbsp;
                <p>`+ doc.data().content + `</p>
            </div>
        </div>`);
        });
    });


const saved_nickname = localStorage.getItem('user_nickname');
$('#nickname').val(saved_nickname);

function submit_comment() {
    var nickname = $('#nickname').val();
    var content = $('#content').val();
    localStorage.setItem('user_nickname', nickname);
    if (nickname == '' || content == '') {
        toast('댓글과 닉네임을 모두 입력해주세요.');
    } else {
        $('#content').val('');
        var uniqueId = (new Date().getTime()).toString(36);
        db.collection('posts').doc(getParam('id')).collection('comments').doc(uniqueId).set({
            username: nickname,
            content: content,
            date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
            id: uniqueId,
        })
    }
}