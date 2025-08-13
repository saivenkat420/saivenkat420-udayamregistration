const puppeteer = require('puppeteer');

class UdyamScraper {
  constructor() {
    this.baseUrl = 'https://udyamregistration.gov.in/UdyamRegistration.aspx';
  }

  async scrapeUdyamPortal() {
    let browser;
    try {
      console.log('Starting Udyam portal scraping...');
      
      // Launch browser
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // Navigate to Udyam portal
      console.log('Navigating to Udyam portal...');
      await page.goto(this.baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for page to load
      await page.waitForSelector('body', { timeout: 10000 });
      
      // Extract form fields and validation rules
      const formData = await page.evaluate(() => {
        const formFields = {};
        
        // Get all form inputs
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
          const name = input.name || input.id || input.getAttribute('data-field');
          if (name) {
            const field = {
              type: input.type || input.tagName.toLowerCase(),
              required: input.required || false,
              maxLength: input.maxLength || null,
              minLength: input.minLength || null,
              pattern: input.pattern || null,
              placeholder: input.placeholder || '',
              options: []
            };
            
            // Get select options
            if (input.tagName === 'SELECT') {
              const options = input.querySelectorAll('option');
              options.forEach(option => {
                if (option.value) {
                  field.options.push({
                    value: option.value,
                    text: option.textContent.trim()
                  });
                }
              });
            }
            
            formFields[name] = field;
          }
        });
        
        return formFields;
      });
      
      // Extract business types and categories
      const businessTypes = await page.evaluate(() => {
        const types = [];
        const typeElements = document.querySelectorAll('select[name*="type"], select[name*="category"]');
        
        typeElements.forEach(select => {
          const options = select.querySelectorAll('option');
          options.forEach(option => {
            if (option.value && option.textContent.trim()) {
              types.push({
                value: option.value,
                text: option.textContent.trim()
              });
            }
          });
        });
        
        return types;
      });
      
      // Extract validation patterns
      const validationPatterns = await page.evaluate(() => {
        const patterns = {};
        const inputs = document.querySelectorAll('input[pattern]');
        
        inputs.forEach(input => {
          if (input.pattern && input.name) {
            patterns[input.name] = input.pattern;
          }
        });
        
        return patterns;
      });
      
      // Extract form structure and labels
      const formStructure = await page.evaluate(() => {
        const structure = [];
        const labels = document.querySelectorAll('label');
        
        labels.forEach(label => {
          const forAttr = label.getAttribute('for');
          const text = label.textContent.trim();
          
          if (forAttr && text) {
            structure.push({
              field: forAttr,
              label: text,
              required: label.querySelector('*[required]') !== null
            });
          }
        });
        
        return structure;
      });
      
      console.log('Scraping completed successfully');
      
      return {
        formFields: formData,
        businessTypes: businessTypes,
        validationPatterns: validationPatterns,
        formStructure: formStructure,
        scrapedAt: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Error scraping Udyam portal:', error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async getValidationRules() {
    try {
      console.log('Getting validation rules from Udyam portal...');
      const scrapedData = await this.scrapeUdyamPortal();
      
      // Convert scraped data to validation rules based on actual portal data
      const validationRules = {};
      
      // Process each scraped form field
      Object.keys(scrapedData.formFields).forEach(fieldName => {
        const field = scrapedData.formFields[fieldName];
        
        validationRules[fieldName] = {
          required: field.required,
          type: field.type,
          minLength: field.minLength,
          maxLength: field.maxLength,
          pattern: field.pattern ? new RegExp(field.pattern) : null,
          placeholder: field.placeholder,
          options: field.options
        };
      });
      
      // Add business types from scraped data
      if (scrapedData.businessTypes.length > 0) {
        validationRules.businessTypes = {
          required: true,
          allowedValues: scrapedData.businessTypes.map(t => t.value),
          options: scrapedData.businessTypes
        };
      }
      
      console.log('Validation rules created from scraped data');
      
      return {
        validationRules,
        scrapedData
      };
      
    } catch (error) {
      console.error('Error getting validation rules:', error);
      throw new Error(`Failed to scrape Udyam portal: ${error.message}`);
    }
  }
}

module.exports = new UdyamScraper();
