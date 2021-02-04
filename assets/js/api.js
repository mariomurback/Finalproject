(function () {
    'use strict';
    $("#supremesearch").on("keypress", (event) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();
        const searchText = encodeURIComponent($('#supremesearch').val());
        searchByAuthor(searchText);
    });

    $.ajax({
        type: 'GET',
        url: "https://quotes.rest/quote/random",
        headers: {
            "X-TheySaidSo-Api-Secret": "xVWvEm3sAUIM_j58p3_q9geF"
        }
    }).done(handeQuote)
    .fail(showError);

})();

function searchByAuthor(searchText) {
    $('.spinner').show();
    $.ajax({
        type: 'GET',
        url: "https://quotes.rest/quote/authors/search?query=" + searchText,
        headers: {
            "X-TheySaidSo-Api-Secret": "xVWvEm3sAUIM_j58p3_q9geF"
        }
    }).done(function (data) {
        $("#author").empty();
        $("#quote").empty();                
        const authours = data.contents.authors;
        if (authours.length > 0) {
            const name = authours[0].name;
            $.ajax({
                type: 'GET',
                url: "https://quotes.rest/quote/search?limit=10&author=" + name,
                headers: {
                    "X-TheySaidSo-Api-Secret": "xVWvEm3sAUIM_j58p3_q9geF"
                }
            })
            .done(handeQuote)
            .fail(showError);
        } else {
            showError();
        }
    });
}

function showError() {
    $('#quote-container').hide();
    $('#error').show();
    $('.spinner').hide();
}

function handeQuote(quoteData) {
    $('#quote-container').show();
    $('#error').hide();
    $("#author").text(quoteData.contents.quotes[0].author);
    $("#quote").text(quoteData.contents.quotes[0].quote);
    $('.spinner').hide();
};

