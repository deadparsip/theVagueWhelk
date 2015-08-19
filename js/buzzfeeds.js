(function () {

    var plues = false,

        pieces = [

        //whichS = ["Top 15 Ways", "Top 14 Ways", "Top 20 Ways", "Top 9 Ways", "5 Sexy Ways", "11 Ways"],

        which = ["This", "Large", "Enraged", "Unconvincing", "Moist And Parted", "George Osbourne's Favourite", "Deceased", "Priapic", "Small But Effective",
            "Geriatric", "Reasonably Unhygienic", "American", "Attractive", "After Atkins-Dieting Her Way Out Of Prison,", "The Pope's Favourite", "Dilapidated", "Fat",
            "Super Skinny", "Toilet Bound", "James Bond Obsessed", "One-Direction Fan and fevered", "Failed", "Partially Insane", "Obsolete Semen Kettle and", "Fully Realised", "Love-Rat", "Utterly Incomprehensible", "Slippery But Thorough", "Nose-Picking", "Flute-Obsessed", "Mis-understood", "North Korean", "Underage", "Cheese-Obsessed", "Boozed-Up"],

        divvy = ["Female Noun", "Screwdriver", "Bum Doctor", "Latte Dispenser Nozzle", "Former Celebrity", "Hungry Traffic Warden", "Bum Enema Survivor", "Big Brother ",
            "Education Secretary and Minister for Women and Equalities", "Japanese Business Man's Shoe", "Neo Liberal Stooge", "Former One Directioner", "Alan Sugar impersonator", "Kardashian Clone", "Depressed Aunt", "Sun Columnist", "Rusty Colander", "Hot Plate", "Traffic Island", "Mother", "Psychic"],

        activity = ["Went For a Poop", "Severed His Penguin's Arteries", "Thought About Some Coffee", "Died In Freak Yoga Accident", "Made Love To All The Jelly Moulds",
            "Fell Up Some Curtains", "Kissed Your Uncle On The Knee", "Learnt To Hate You", "Refers to Holiday Elephant As A 'Hungry Dick'",
            "Apparently Did Not Die", "Apologises After Being Caught Fishing", "Conjured A Devil From The Fiery Pit", "Crushes Kitten In Home-Made Trouser Press", "Accidentally Buried Wrong Grandparent", "Refilled Queen's Favourite Beaker", "Rapped Three Verses Of Jay-Z Hit", "Fell On A Puppy And Wrote It Off",
            "Wins Thumb War Tournament", "Refuses To Apologise For Own Existence", "Manages To Play Flute Underwater For 10 Minutes Before Succumbing", "Is Primary Reason For Global Warming", "Discovers Best 14 Ways To Kick Football", "Refers to Holiday Elephant As A 'Hungry Dick'", "Stared At ThermoStat For Fully 12 Minutes Without Changing Temperature", "Decided Against Surgery Despite Mother's Advice", "Spat On George Michael's Spleen", "Fully Refuted The Existence Of Gorillas", "Refused Gin And Tonic Three Times"],


        madeUpBit1 = ["- What Happened Next ", "- How He Survived ", "- The Outcome", "- What He Did Afterwards", "- How He Never Cried",
            "- Nobody Knows Why But This", "- How This Happened", "- Put Some Seatbelts On Your Eyes Because We Are Taking You For A Ride And It",
            "- What He Left Behind", "- Mark Ronson Reckons It", "- Only a 90s Throwback Would Think This"],


        madeUpBit3 = ["Is Triple Triple Cray, Read This Right Here To Make Your Happy Wetter",
            "Is Shocking Beyond Belief (If Your Belief Is Made Of Gravy)", " Will Make You Literally Crap Your Entire Body Out Of Existence Until All That Remains Of Your Is A Concept", "Explains String Theory So Well You Will Feel Like A Cute Kitten",
            "Is Effing Nuts", "Is So Horrible, Listening To Bruno Mars Won't Seem So Bad AnyMore And Might Not Even Make You Want To Kill",
            "Sounds Very Interesting, But When You Click Through And Read It You Will Feel Cheated  And Unhappy And Start The Killing Again",
            "Is So Bad You May Want To Set Fire To All Of The People And Not Strum",
            "Will Make Your Entire Existence Seem Nearly As Pointless As It Really Is", "Will Make You Want To Click On This Article ThreeTy Times And Not Just Once",
            "Is In The Top 15 Things Only A Tit Would Know", "Is In The Top 22 Things Only A Football Would Know",
            "Is Something Only A 90s Throwback Would Know", "Means You Are Dumb",
            "Will Force You To Unapologetically Scream Very Close To Your Sister's Ears!", "Definitely Won't Make Your Dad Read The Bible Again",
            "Will Make Your Eyes Weep And Therefore Be Unmanly And Not Ready For The Apocalypse",
            "Is, Like The Rest Of This Headline, Unnecessarily Capitalised", "Is Bullshit That You Want To Read But You Don't Know Why",
            "Will Solve All Your Constipation Problems", "Will Probably Make You Question Your Entire Existence",
            "Is So Crazy You Will Never Be Able To Convincingly Make Love Ever Again", "Is So Interesting Your Trousers Will Become Slightly Looser Than They Were Yesterday", "Will Probably Result In You Upping Your Dosage",
            "Will Keep The Chickens At Bay For A Time", "Won't Make You Feel Better Than When You Are Alone With Your Thoughts At Night", "Is Not WrestleMania"]

        ];


    var getrandom = function (list) {
        return Math.floor(Math.random() * (list.length - 0));
    };

    var makeHeadline = function () {
        var result = [];
        for (var i = 0; i < pieces.length; i++) {
            var r = getrandom(pieces[i]);
            result.push(pieces[i][r]);
        }
        return result.join(" ");
    };

    //var pluraliayay = function() {
    //};

    var clicker = document.getElementById("buzzfeeds"),
        output = document.getElementById("output");

    clicker.addEventListener("click", function () {
        output.textContent = makeHeadline();
    });

    return {
        makeHeadline: makeHeadline
    };




})();

//Copyright © 2010 Jon Stevens and The Vague Whelk. All rights reserved. (And Calippos).