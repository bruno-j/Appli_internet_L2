var intervalID=null;window.addEventListener("load",function(){afficheHeure();majHeure();abonnements()});function abonnements(){document.getElementById("checkPause").addEventListener("click",majHeure)}function format2chiffres(a){return 10>a?"0"+a:""+a}function afficheHeure(){var a=new Date,b=a.getHours(),c=a.getMinutes(),a=a.getSeconds(),b=format2chiffres(b),c=format2chiffres(c),a=format2chiffres(a),b=b+":"+c+":"+a;document.getElementById("heure").textContent=b}
function majHeure(){afficheHeure();document.getElementById("checkPause").checked?intervalID&&window.clearInterval(intervalID):intervalID=window.setInterval(afficheHeure,1E3)};
