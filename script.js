// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Image Upload Functionality
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadedImages = document.getElementById('uploadedImages');

// Click on upload area to trigger file input
uploadArea.addEventListener('click', function() {
    fileInput.click();
});

// Upload button click
uploadBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent triggering the upload area click
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', function(e) {
    const files = e.target.files;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                removeBtn.addEventListener('click', function() {
                    imageItem.remove();
                });
                
                imageItem.appendChild(img);
                imageItem.appendChild(removeBtn);
                uploadedImages.appendChild(imageItem);
            };
            
            reader.readAsDataURL(file);
        }
    }
    
    // Reset file input
    fileInput.value = '';
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#023020';
    uploadArea.style.backgroundColor = 'rgba(2, 48, 32, 0.05)';
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.backgroundColor = 'transparent';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    uploadArea.style.backgroundColor = 'transparent';
    
    const files = e.dataTransfer.files;
    fileInput.files = files;
    
    // Trigger change event
    const event = new Event('change');
    fileInput.dispatchEvent(event);
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});