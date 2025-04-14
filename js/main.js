// Main JavaScript for Rafiqi SSM Panel

document.addEventListener('DOMContentLoaded', function() {
    const purchaseForm = document.getElementById('purchase-form');
    const buyButtons = document.querySelectorAll('.buy-btn');
    const usernameInput = document.getElementById('instagram-username');
    const utrInput = document.getElementById('utr-number');
    
    // Add click event to all Buy Now buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Smooth scroll to form
            const formSection = document.querySelector('.payment-form');
            formSection.scrollIntoView({ behavior: 'smooth' });
            
            // Focus on the username input
            setTimeout(() => {
                usernameInput.focus();
            }, 800);
            
            // Get package info from the card
            const card = this.closest('.package-card');
            const packageName = card.querySelector('h3').textContent;
            const followers = card.querySelector('.followers').textContent;
            const price = card.querySelector('.price').textContent;
            
            // Add a visual highlight to the selected package
            document.querySelectorAll('.package-card').forEach(card => {
                card.classList.remove('selected-package');
            });
            card.classList.add('selected-package');
            
            // Optional: Display selected package info near the form
            const formTitle = document.querySelector('.payment-form h2');
            formTitle.innerHTML = `Complete Your Purchase: <span class="highlight-package">${packageName} - ${followers} Followers (${price})</span>`;
        });
    });
    
    // Form validation
    purchaseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        let errorMessage = '';
        
        // Validate Instagram username (simple validation)
        if (usernameInput.value.trim() === '') {
            isValid = false;
            errorMessage = 'Please enter your Instagram username';
            usernameInput.classList.add('input-error');
        } else {
            usernameInput.classList.remove('input-error');
        }
        
        // Validate UTR number (simple validation)
        if (utrInput.value.trim() === '') {
            isValid = false;
            errorMessage = errorMessage || 'Please enter the UTR number from your payment';
            utrInput.classList.add('input-error');
        } else {
            utrInput.classList.remove('input-error');
        }
        
        // If valid, show success message (in a real app, this would submit to a server)
        if (isValid) {
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Order Submitted Successfully!</h3>
                <p>We've received your order for <b>@${usernameInput.value}</b>.</p>
                <p>Your followers will be delivered within 24-48 hours.</p>
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
        } else {
            // Show error shake animation on submit button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.classList.add('error-shake');
            setTimeout(() => {
                submitBtn.classList.remove('error-shake');
            }, 500);
        }
    });
    
    // Remove error styling on input when user starts typing
    usernameInput.addEventListener('input', function() {
        this.classList.remove('input-error');
    });
    
    utrInput.addEventListener('input', function() {
        this.classList.remove('input-error');
    });
    
    // Add some interactive neon effects on hover for various elements
    const addNeonEffect = (elements, hoverClass) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add(hoverClass);
            });
            element.addEventListener('mouseleave', () => {
                element.classList.remove(hoverClass);
            });
        });
    };
    
    // Add pulsing effect to the Instagram logo
    const instagramLogo = document.querySelector('.instagram-logo');
    instagramLogo.addEventListener('mouseenter', () => {
        instagramLogo.style.animationDuration = '0.5s';
    });
    instagramLogo.addEventListener('mouseleave', () => {
        instagramLogo.style.animationDuration = '2s';
    });
});

// Add CSS classes for the new elements referenced in the JS
document.addEventListener('DOMContentLoaded', function() {
    // Add these styles to the document
    const style = document.createElement('style');
    style.textContent = `
        .input-error {
            border-color: #ff2e89 !important;
            box-shadow: 0 0 10px rgba(255, 46, 137, 0.5) !important;
        }
        
        .error-shake {
            animation: error-shake 0.5s ease-in-out;
        }
        
        .selected-package {
            border-color: var(--neon-green) !important;
            box-shadow: 0 0 20px var(--neon-green) !important;
        }
        
        .highlight-package {
            color: var(--neon-green);
            font-weight: normal;
            font-size: 0.9em;
        }
        
        .success-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: var(--card-bg);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5),
                        0 0 15px var(--neon-green);
            border: 1px solid var(--neon-green);
            z-index: 1000;
            max-width: 90%;
            width: 400px;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .success-message.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .success-icon {
            font-size: 3rem;
            color: var(--neon-green);
            margin-bottom: 20px;
            text-shadow: 0 0 10px var(--neon-green);
        }
        
        .success-message h3 {
            margin-bottom: 15px;
            color: white;
        }
        
        .success-message p {
            margin-bottom: 10px;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .close-btn {
            background: linear-gradient(to right, var(--neon-green), var(--neon-blue));
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            cursor: pointer;
            margin-top: 20px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            box-shadow: 0 0 15px var(--neon-green);
            transform: scale(1.05);
        }
        
        @keyframes error-shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
