let articles = []

const ARTICLES_URL =
  'https://gist.githubusercontent.com/BarakAlmog/97a0a07608e11deb54719a394bc0a74c/raw'

async function loadArticles() {
  try {
    const response = await fetch(ARTICLES_URL)
    articles = await response.json()
    console.log(articles)
    displayArticleGrid()
  } catch (error) {
    console.error('Error loading articles:', error)
    displayErrorMessage()
  }
}

function displayErrorMessage() {
  const articleGrid = document.getElementById('article-grid')
  articleGrid.innerHTML =
    '<p class="error-message">Sorry, we couldn\'t load the articles. Please try again later.</p>'
}

function displayArticleGrid() {
  const articleGrid = document.getElementById('article-grid')
  const articleFull = document.getElementById('article-full')

  articleGrid.innerHTML = ''
  articleGrid.classList.remove('hidden')
  articleFull.classList.add('hidden')

  articles.forEach((article, index) => {
    const articleElement = document.createElement('div')
    articleElement.className = 'article'
    articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <a href="#" class="read-more" data-index="${index}">Read more</a>
        `
    articleGrid.appendChild(articleElement)
  })

  // Add event listeners to "Read more" links
  document.querySelectorAll('.read-more').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const index = parseInt(e.target.getAttribute('data-index'))
      displayFullArticle(index)
    })
  })
}

function displayFullArticle(index) {
  const article = articles[index]
  const articleFull = document.getElementById('article-full')
  const articleGrid = document.getElementById('article-grid')

  articleFull.innerHTML = `
        <button id="back-button" class="back-button">&larr; Back to Articles</button>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
    `

  articleGrid.classList.add('hidden')
  articleFull.classList.remove('hidden')

  // Add event listener to back button
  document.getElementById('back-button').addEventListener('click', displayArticleGrid)
}

function setupNavigation() {
  document.querySelector('.nav-home').addEventListener('click', (e) => {
    e.preventDefault()
    displayArticleGrid()
  })
}

window.addEventListener('load', () => {
  loadArticles()
  setupNavigation()
})
