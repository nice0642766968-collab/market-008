import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ข้อมูลของคุณ
const firebaseConfig = {
    apiKey: "AIzaSyAmbzRxqYFti6IEksy2WunKCVa_v8Gg0F0",
    authDomain: "market-digital-3d10e.firebaseapp.com",
    projectId: "market-digital-3d10e",
    storageBucket: "market-digital-3d10e.firebasestorage.app",
    messagingSenderId: "368580098929",
    appId: "1:368580098929:web:7e005211ceb83b3b9794d0",
    measurementId: "G-Q985QSMDDT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// จัดการ Modal
const modal = document.getElementById("auth-modal");
const loginBtn = document.getElementById("login-nav-btn");
const closeBtn = document.getElementsByClassName("close")[0];

loginBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

// ระบบ Login / Signup
document.getElementById("auth-submit-btn").onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // ในตัวอย่างนี้ทำเป็น Login อย่างเดียว (สามารถเพิ่ม logic สมัครสมาชิกได้)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("เข้าสู่ระบบสำเร็จ!");
        modal.style.display = "none";
    } catch (error) {
        alert("เกิดข้อผิดพลาด: " + error.message);
    }
};

// ฟังก์ชันดึงสินค้าแยกตามหมวดหมู่ (คณะ)
async function loadProducts(category = null) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "กำลังโหลด...";
    
    let q = collection(db, "products");
    if (category) {
        q = query(collection(db, "products"), where("faculty", "==", category));
    }

    const querySnapshot = await getDocs(q);
    productList.innerHTML = "";
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        productList.innerHTML += `
            <div class="product-card">
                <h3>${data.name}</h3>
                <p>ราคา: ${data.price} บาท</p>
                <small>คณะ: ${data.faculty}</small>
                <button onclick="startChat('${data.sellerId}')">แชทกับผู้ขาย</button>
            </div>
        `;
    });
}

// เรียกใช้งานตอนโหลดหน้าเว็บ
loadProducts();
