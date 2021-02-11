window.resizeIframe = () => {
  const iframe = document.getElementById('time-in-canada-iframe')
  iframe.style.height = iframe.contentWindow.document.documentElement.getBoundingClientRect().height + 'px'
}

window.addEventListener('message', (event) => {
  if (event.data === 'resizeTimeCalculator' && event.origin === 'https://time-in-canada.vercel.app') {
    resizeIframe()
  }
})
