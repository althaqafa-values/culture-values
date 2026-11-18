/* Cloud Messaging service worker for /culture-values/ */
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const allowed=['notifications','questions','announcements','daily-activities','contests'];
 const page=event.notification.data&&event.notification.data.page;
 const target=new URL('./?open='+(allowed.includes(page)?page:'notifications'),self.registration.scope).href;
 event.waitUntil((async()=>{
  const all=await clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of all){
   if(client.url.startsWith(self.registration.scope)){
    if('navigate' in client)await client.navigate(target);
    return client.focus();
   }
  }
  return clients.openWindow(target);
 })());
});
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');
firebase.initializeApp({
 apiKey:'AIzaSyAc9DLDQcH0vPnH3D2wAxgf5M0OLGIbQ5o',
 authDomain:'omran-b8b08.firebaseapp.com',
 projectId:'omran-b8b08',
 storageBucket:'omran-b8b08.firebasestorage.app',
 messagingSenderId:'268326579896',
 appId:'1:268326579896:web:bfa564b949d392ea05ce4d'
});
const messaging=firebase.messaging();
messaging.onBackgroundMessage(payload=>{
 const d=payload.data||{};
 const allowed=['notifications','questions','announcements','daily-activities','contests'];
 const page=allowed.includes(d.page)?d.page:'notifications';
 return self.registration.showNotification(String(d.title||'الثقافة والقيم').slice(0,110),{
  body:String(d.body||'لديك تحديث جديد في المنصة').slice(0,180),
  icon:new URL('./app-icon-192.png',self.registration.scope).href,
  badge:new URL('./app-icon-192.png',self.registration.scope).href,
  tag:String(d.eventId||'culture-update').slice(0,120),
  data:{page}
 });
});
