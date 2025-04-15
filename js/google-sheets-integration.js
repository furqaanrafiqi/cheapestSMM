// Google Sheets integration for SMM Panel
document.addEventListener('DOMContentLoaded', function() {
    const purchaseForm = document.getElementById('purchase-form');
    
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const instagramInput = document.getElementById('instagram-URL');
            const utrInput = document.getElementById('utr-number');
            const emailInput = document.getElementById('email');
            
            if (!instagramInput || !utrInput || !emailInput) return;
            
            let isValid = true;
            if (instagramInput.value.trim() === '') {
                isValid = false;
                instagramInput.classList.add('input-error');
            } else {
                instagramInput.classList.remove('input-error');
            }
            
            if (utrInput.value.trim() === '') {
                isValid = false;
                utrInput.classList.add('input-error');
            } else {
                utrInput.classList.remove('input-error');
            }
            
            if (isValid) {
                // Get the selected package info
                const selectedCard = document.querySelector('.package-card.selected-package');
                let packageType = '';
                let quantity = '';
                let price = '';
                
                if (selectedCard) {
                    const typeElement = selectedCard.querySelector('.followers-text');
                    if (typeElement) packageType = typeElement.textContent;
                    
                    const quantityElement = selectedCard.querySelector('.followers');
                    if (quantityElement) quantity = quantityElement.textContent;
                    
                    const priceElement = selectedCard.querySelector('.price');
                    if (priceElement) price = priceElement.textContent;
                }
                
                // Show loading animation
                const submitBtn = document.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
                submitBtn.disabled = true;
                
                // Add spinner style if it doesn't exist
                if (!document.getElementById('spinner-style')) {
                    const style = document.createElement('style');
                    style.id = 'spinner-style';
                    style.textContent = `
                        .spinner {
                            display: inline-block;
                            width: 1em;
                            height: 1em;
                            border: 2px solid rgba(255,255,255,0.3);
                            border-radius: 50%;
                            border-top-color: white;
                            animation: spin 0.8s linear infinite;
                            margin-right: 8px;
                        }
                        
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Prepare data for Google Sheets
                const formData = {
                    timestamp: new Date().toISOString(),
                    username: instagramInput.value,
                    utrNumber: utrInput.value,
                    email: emailInput.value,
                    packageType: packageType || 'Not specified',
                    quantity: quantity || 'Not specified',
                    price: price || 'Not specified'
                };
                
                // Google Sheet Apps Script URL
                const scriptURL = 'https://script.google.com/macros/s/AKfycbweKBVwvhY5fMFWvV9_fr9qzTZW7VxfXlcqnRqH1VN3cV9oZMtJMDodskfu7kKMRWDE/exec';
                
                // Log the data being sent (for debugging)
                console.log("Sending data to Google Sheets:", formData);
                
                // Send data to Google Sheets
                fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors' // Important for Google Apps Script
                })
                .then(response => {
                    console.log("Response received", response);
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Create success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                        <h3>Order Submitted Successfully!</h3>
                        <p>We've received your order for <b>@${instagramInput.value}</b>.</p>
                        <p>Package: ${packageType} ${quantity || ''} ${price ? '- ' + price : ''}</p>
                        <p>Your order will be delivered within 24-48 hours.</p>
                        <button class="close-btn">Close</button>
                    `;
                    
                    // Add to page
                    document.body.appendChild(successMessage);
                    
                    // Show with animation
                    setTimeout(() => {
                        successMessage.classList.add('show');
                    }, 10);
                    
                    // Close button functionality
                    successMessage.querySelector('.close-btn').addEventListener('click', function() {
                        successMessage.classList.remove('show');
                        setTimeout(() => {
                            successMessage.remove();
                        }, 300);
                    });
                    
                    // Reset form
                    purchaseForm.reset();
                    
                    // To remove selected package highlighting
                    const selectedPackage = document.querySelector('.selected-package');
                    if (selectedPackage) {
                        selectedPackage.classList.remove('selected-package');
                    }
                    
                    // Reset form title
                    const formTitle = document.querySelector('.payment-form h2');
                    if (formTitle) {
                        formTitle.innerHTML = 'Complete Your Purchase';
                    }
                }, 2000); // 2 second delay to simulate API call
                
                /* When you're ready to connect to an actual Google Sheet, replace the setTimeout with:
                
                fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                })
                .then(() => {
                    // All the success message code from above
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    alert('There was an error submitting your order. Please try again or contact support.');
                });
                */
            } else {
                // Show error shake animation on submit button
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.classList.add('error-shake');
                setTimeout(() => {
                    submitBtn.classList.remove('error-shake');
                }, 500);
            }
        });
    }
});
