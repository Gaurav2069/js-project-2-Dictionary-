const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        const result = document.getElementById("result");
        const sound = document.getElementById("sound");

        document.addEventListener("click", function(event) {
            if (event.target.matches("#result button")) {
                playSound();
            }
        });

        document.getElementById("search-btn").addEventListener("click", () => {
            let inpWord = document.getElementById("inp-word").value;
            fetch(`${url}${inpWord}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    result.innerHTML = `
                    <div class="word">
                        <h3>${inpWord}</h3>
                        <button>
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech}</p>
                        <p>/${data[0].phonetic}/</p>
                    </div>
                    <p class="word-meaning">
                       ${data[0].meanings[0].definitions[0].definition}
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[0].definitions[0].example || ""}
                    </p>`;
                    sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
                })
                .catch(() => {
                    result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
                });
        });

        function playSound() {
            sound.play().catch(error => {
                console.error('Failed to play sound:', error);
            });
        }