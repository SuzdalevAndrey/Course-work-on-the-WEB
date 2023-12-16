function openTab(tabName) {
    var tabs = document.querySelectorAll('.form-wrap');
    tabs.forEach(function(tab) {
      tab.style.display = 'none';
    });
  
    document.getElementById(tabName).style.display = 'block';
  }