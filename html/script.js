var selectedChar = null;
var selectedCSN = null;
var WelcomePercentage = "30vh"
var CharDatas = [];
qbMultiCharacters = {}
var Loaded = false;
var NChar = null;
var CharacterMaxCreate = [];
var NumberOffClear = null;
var SelectedCharGender = null;

$(document).ready(function (){
    window.addEventListener('message', function (event) {
        var data = event.data;

        if (data.action == "ui") {
			NChar = data.nChar;
            if (data.toggle) {
                RefreshExpertData()
                $('.container').show();
                $(".welcomescreen").fadeIn(150);
                $(".SelectChar-NewMenu").fadeOut(150);
                $(".NewbtnExpertMulti").fadeOut(150);
                qbMultiCharacters.resetAll();

                CharacterMaxCreate = [];
                for (let i = 1; i <= NChar; i++) {
                    CharacterMaxCreate[i] = false
                }

                $.post('https://qb-multicharacter/setupCharacters');
                setTimeout(function(){
                    setTimeout(function(){
                        $(".welcomescreen").fadeOut(0);
                        $(".SelectChar-NewMenu").fadeIn(150);
                        $(".NewbtnExpertMulti").fadeIn(150);
                        $.post('https://qb-multicharacter/removeBlur');
                    }, 2000);
                }, 2000);
            } else {
                $('.container').fadeOut(250);
                qbMultiCharacters.resetAll();
            }
        }

         if (data.action == "SetupCharacterNUI") {
            SetupCharNUI(event.data.left, event.data.top, event.data.cid, event.data.charinfo, event.data.Data)
        }

    });

    $('.datepicker').datepicker();
});

$('.continue-btn').click(function(e){
    e.preventDefault();
});

$('.disconnect-btn').click(function(e){
    e.preventDefault();

    $.post('https://qb-multicharacter/closeUI');
    $.post('https://qb-multicharacter/disconnectButton');
});


function SetupCharNUI(left, top, cid, charinfo, Data) {
    CharDatas[Data.citizenid] = Data
    var namechar = charinfo.firstname+" "+charinfo.lastname
    var AddOption = '<div id="char-'+cid+'" data-namechar="'+namechar+'" data-csn="'+Data.citizenid+'" data-cid="'+cid+'" style="left: '+left+'%; top: '+top+'%;" class="New-NUI-Style"></div>';
    CharacterMaxCreate[cid] = true
    $('.SelectChar-NUI-New').append(AddOption);
    
}

$(document).on('click', '.New-NUI-Style', function(e){
    e.preventDefault();
    var cid = $(this).data('cid');
    var name = $(this).data('namechar');
    var csn = $(this).data('csn');

    selectedChar = cid
    selectedCSN = csn

    $(".SelectChar-DeleteChar").css({"background":"#f5a15b"});
    $(".SelectChar-SpawnChar").css({"background":"#8ee074"});
    $(".SelectChar-header").html(name);
})

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'=/]/g, function (s) {
        return entityMap[s];
    });
}
function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }


$(document).on('click', '#CreateCharExpert', function (e) {
    e.preventDefault();
    var AccessCreate = false
    NumberOffClear = null
    for (const [k, v] of Object.entries(CharacterMaxCreate)) {
        if(v == false){
            NumberOffClear = k
            AccessCreate = true
        }
    }

    if(AccessCreate){
        $(".Expert-NewCharacterRegister").fadeIn(150);
    }else{
        console.log("You have reached the maximum character")
    }
});
$(document).on('click', '.RegisterRed', function (e) {
    e.preventDefault();
    $(".Expert-NewCharacterRegister").fadeOut(150);
});
  
$(document).on('click', '.RegisterGreen', function (e) {
    e.preventDefault();

    var success = true

    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let nationality = $("#nationality").val();
    let birthdate = escapeHtml($('#born').val())
    let gender = SelectedCharGender
    let cid = NumberOffClear
    const regTest = new RegExp(profList.join('|'), 'i');

    if (!firstname || !lastname || !nationality || !birthdate || hasWhiteSpace(firstname) || hasWhiteSpace(lastname)|| hasWhiteSpace(nationality) ){
        console.log("FIELDS REQUIRED")
        success = false
        return false;
    }

    if(regTest.test(firstname) || regTest.test(lastname)){
        console.log("ERROR: You used a derogatory/vulgar term. Please try again!")
        success = false
        return false;
    }

    if(gender == null){
        console.log("ERROR: Select a Gender !")
        success = false
        return false;
    }

    if(success){
        $.post('https://qb-multicharacter/createNewCharacter', JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            nationality: nationality,
            birthdate: birthdate,
            gender: gender,
            cid: cid,
        }));
        $(".Expert-NewCharacterRegister").fadeOut(150);
        $(".container").fadeOut(150);
        $('.characters-list').css("filter", "none");
        qbMultiCharacters.fadeOutDown('.character-register', '125%', 400);
        refreshCharacters()    
    }

});

$(document).on('click', '.Expert-Register-ImageStyle', function(e){
    SelectedCharGender = null
    var genders = $(this).data('gender');
    if(genders == "man"){
        SelectedCharGender = "Male"
        $('#Expert-man').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878350193475588146/male2.png');
        $('#Expert-woman').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878254563063369818/female.png');
    }else{
        SelectedCharGender = "Female"
        $('#Expert-woman').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878350146792984616/female2.png');
        $('#Expert-man').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878254579622502471/male.png');
    }
});

$(document).on('click', '#accept-delete', function(e){
    $.post('https://qb-multicharacter/removeCharacter', JSON.stringify({
        citizenid: selectedCSN
    }));
    $('.character-delete').fadeOut(150);
    $('.BlackScreenForNotAbuse').fadeOut(150);
    $('.characters-block').css("filter", "none");
    refreshCharacters();
});

$(document).on('click', '#cancel-delete', function(e){
    e.preventDefault();
    $('.characters-block').css("filter", "none");
    $('.character-delete').fadeOut(150);
    $('.BlackScreenForNotAbuse').fadeOut(150);
});

function refreshCharacters() {
    setTimeout(function(){
        $(selectedChar).removeClass("char-selected");
        selectedChar = null;
        $.post('https://qb-multicharacter/setupCharacters');
        $("#delete").css({"display":"none"});
        $("#play").css({"display":"none"});
        qbMultiCharacters.resetAll();
    }, 100)
}

function RefreshExpertData() {
    $(".SelectChar-NUI-New").html("");
    CharDatas = [];
    // CharacterMaxCreate = [];
    $(".SelectChar-DeleteChar").css({"background":"#373737"});
    $(".SelectChar-SpawnChar").css({"background":"#373737"});
    $(".SelectChar-header").html("Select a Character");
    $('.BlackScreenForNotAbuse').fadeOut(150);
    $('#Expert-woman').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878254563063369818/female.png');
    $('#Expert-man').attr('src','https://cdn.discordapp.com/attachments/877595408325574656/878254579622502471/male.png');

    $("#firstname").val("");
    $("#lastname").val("");
    $("#nationality").val("");
}

$(document).on('click', '.SelectChar-SpawnChar', function(e) {
    e.preventDefault();

    if (selectedChar !== null) {
        $.post('https://qb-multicharacter/selectCharacter', JSON.stringify({
            cData: CharDatas[selectedCSN]
        }));
        setTimeout(function(){
            qbMultiCharacters.resetAll();
        }, 1500);
    }
});

$(document).on('click', '#RefreshExpert', function(e) {
    e.preventDefault();
    refreshCharacters()
    RefreshExpertData()
});

$(document).on('click', '#HelpExpert', function(e) {
    e.preventDefault();
    $('.expertHelpMenu').fadeIn(150);
});
$(document).on('click', '.expertHelpMenu', function(e) {
    e.preventDefault();
    $('.expertHelpMenu').fadeOut(150);
});

$(document).on('click', '.SelectChar-DeleteChar', function(e) {
    e.preventDefault();

    if (selectedChar !== null) {
        $('.characters-block').css("filter", "blur(2px)")
        $('.character-delete').fadeIn(250);
        $('.BlackScreenForNotAbuse').fadeIn(150);
    }
});

qbMultiCharacters.fadeOutDown = function(element, percent, time) {
    if (percent !== undefined) {
        $(element).css({"display":"block"}).animate({top: percent,}, time, function(){
            $(element).css({"display":"none"});
        });
    } else {
        $(element).css({"display":"block"}).animate({top: "103.5%",}, time, function(){
            $(element).css({"display":"none"});
        });
    }
}

qbMultiCharacters.resetAll = function() {
    $('.welcomescreen').css("top", WelcomePercentage);
    $('.server-log').show();
    $('.server-log').css("top", "25%");
}