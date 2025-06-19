 // Navigation functions
        function showSection(sectionName) {
            // Hide all sections
            const sections = ['feed-section', 'connections-section', 'research-section'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    element.style.display = 'none';
                }
            });
            
            // Show selected section
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            
            // Update active nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelectorAll('.sidebar-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            event.target.classList.add('active');
        }
        
    