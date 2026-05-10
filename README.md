

Proiect Cloud Computing
Dental Care Clinique Web Application







Luculescu Diana-Andreea
SIMPRE
Grupa 1146
Link video: 
Link publicare: https://cloud-computing-2026.vercel.app/










1. Introducere
   Pentru acest proiect am dezvoltat o aplicație web full-stack pentru gestionarea programărilor la o clinică stomatologică. Aplicația permite utilizatorilor să își creeze cont, să se autentifice, să realizeze programări online și să își gestioneze profilul personal.
   Proiectul a fost realizat folosind tehnologii moderne de cloud computing și dezvoltare web:
•	Next.js
•	MongoDB Atlas
•	Cloudinary
•	SendGrid
•	Vercel
   Aplicația este de tip full-stack și utilizează API routes pentru comunicarea dintre frontend și backend.
2. Descriere problemă
   Gestionarea tradițională a programărilor prin telefon sau agendă fizică este ineficientă, predispusă la erori și nu oferă pacienților flexibilitate. Problema adresată este digitalizarea acestui proces într-un mediu Cloud, asigurând:
•	Disponibilitate 24/7 a sistemului.
•	Persistența datelor și accesul de pe orice dispozitiv.
•	Notificări automate pentru reducerea ratei de neprezentare.
3. Descriere API
   Aplicația utilizează un API de tip REST construit pe rutele serverless din Next.js.
   Servicii Cloud utilizate:
•	Bază de date: MongoDB Atlas (Database-as-a-Service) pentru stocarea utilizatorilor și programărilor.
•	Stocare Media: Cloudinary pentru gestionarea imaginilor de profil.
•	Email: SendGrid API pentru trimiterea confirmărilor de programare.
•	Hosting: Vercel pentru deployment-ul codului și execuția funcțiilor serverless.

4. Flux de date
   Metode HTTP utilizate:	
POST	/api/register	Crearea unui cont nou cu criptare Bcrypt.
POST	/api/login	Autentificarea utilizatorului și setarea cookie-ului de sesiune.
POST	/api/appointments	Crearea unei programări și declanșarea mail-ului prin SendGrid.
GET	/api/allAppointments	Preluarea programărilor specifice utilizatorului logat.
PUT	/api/profile	Actualizarea datelor de profil în MongoDB.
POST	/api/upload	Încărcarea imaginii în format Base64 către Cloudinary.

   Aplicația folosește Cookies (HttpOnly) pentru securitate. La login, ID-ul utilizatorului este stocat într-un cookie HttpOnly. Rutele API (precum /api/appointments) verifică prezența acestui cookie înainte de a procesa cererea.
   Exemplu de Request / Response: crearea unei programări (POST /api/appointments)
•	Request (Date trimise de utilizator):
JSON
{
  "service": "Control stomatologic",
  "date": "2026-06-15",
  "time": "10:00"
}
•	Response (Răspuns de la server):
JSON
{
  "message": "Appointment created"
}
•	Efect în Cloud: Datele sunt salvate în MongoDB Atlas, iar un trigger declanșează trimiterea unui email via SendGrid.

5. Capturi ecran aplicație
 
 ### Login
![Login](public/screenshots/Imagine1.png)

### Register
![Register](public/screenshots/Imagine2.png)

### Dashboard
![Dashboard](public/screenshots/Imagine3.png)

### Appointments
![Appointments](public/screenshots/Imagine4.png)

### Profile
![Profile](public/screenshots/Imagine5.png)
 
 
 
6. Referințe 
1.	Next.js Documentation – https://nextjs.org/docs 
2.	MongoDB Atlas Guide – https://www.mongodb.com/docs/atlas/ 
3.	Vercel Deployment Docs – https://vercel.com/docs 
4.	Cloudinary API Reference – https://cloudinary.com/documentation 
5.	SendGrid Mail Service – https://docs.sendgrid.com/ 
6.	Bcrypt.js Library – https://www.npmjs.com/package/bcryptjs 

