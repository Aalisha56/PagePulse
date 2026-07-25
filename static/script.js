async function analyzeWebsite() {

    let url = document.getElementById("url").value.trim();
    const result = document.getElementById("result");

    if (url === "") {
        result.innerHTML = `
        <div class="card">
            <h3>❌ Missing URL</h3>
            <p>Please enter a website URL.</p>
        </div>`;
        return;
    }

    // Automatically add https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Loading
    result.innerHTML = `
        <div class="card">
            <h3>⏳ Analyzing Website...</h3>
            <p>Fetching page data...</p>
        </div>
    `;

    try {

        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.error) {

            result.innerHTML = `
            <div class="card">
                <h3>❌ Error</h3>
                <p>${data.error}</p>
            </div>`;

            return;
        }

        // Status Badge
        let statusBadge = "🟢 Success";

        if (data.status >= 400)
            statusBadge = "🔴 Error";
        else if (data.status >= 300)
            statusBadge = "🟡 Redirect";

        // Response Speed
        let speed = "🟢 Fast";

        if (data.response_time > 2)
            speed = "🔴 Slow";
        else if (data.response_time > 1)
            speed = "🟡 Average";

        // Time
        const now = new Date().toLocaleString();

        // Domain
        const domain = new URL(url).hostname;

        result.innerHTML = `

        <div class="card">
            <h3>🌍 Website</h3>
            <p>${domain}</p>
        </div>

        <div class="card">
            <h3>📅 Analysis Time</h3>
            <p>${now}</p>
        </div>

        <div class="card">
            <h3>🌐 HTTP Status</h3>
            <p>${statusBadge}</p>
            <strong>${data.status}</strong>
        </div>

        <div class="card">
            <h3>⚡ Response Time</h3>
            <p>${speed}</p>
            <strong>${data.response_time} sec</strong>
        </div>

        <div class="card">
            <h3>📄 Page Title</h3>
            <p>${data.title}</p>
        </div>

        <div class="card">
            <h3>📝 Meta Description</h3>
            <p>${data.meta_description}</p>
        </div>

        <div class="card">
            <h3>📌 H1 Tags</h3>
            <strong>${data.h1_count}</strong>
        </div>

        <div class="card">
            <h3>🖼 Images Missing Alt</h3>
            <strong>${data.missing_alt}</strong>
        </div>

        <div class="card">
            <h3>📚 Word Count</h3>
            <strong>${data.word_count}</strong>
        </div>

        `;

    }
    catch (error) {

        result.innerHTML = `
        <div class="card">
            <h3>❌ Connection Error</h3>
            <p>Unable to analyze this website. Please check the URL and try again.</p>
        </div>`;

    }

}

document.getElementById("url").addEventListener("keypress", function(event){

    if(event.key==="Enter"){
        analyzeWebsite();
    }

});