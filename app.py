from flask import Flask, render_template, request, jsonify
from data import gadgets

app = Flask(__name__)

@app.route('/')
def home():
    """Renders the main HTML template."""
    return render_template('index.html', gadgets=gadgets)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """
    API Endpoint to get gadget recommendations based on budget, category, and usage.
    Accepts JSON body: { category: str, budget: str, usage: str }
    """
    data = request.json
    
    # Extract criteria
    category = data.get('category')
    budget = data.get('budget')
    usage = data.get('usage')
    
    if not category or not budget or not usage:
        return jsonify({"error": "Missing required parameters"}), 400
        
    recommendations = []
    
    # Python-based filtering logic
    for gadget in gadgets:
        # Must match category
        if gadget['category'] != category:
            continue
            
        # Must match budget or be lower (value for money)
        budget_match = (gadget['budget'] == budget)
        if budget == 'high' and gadget['budget'] in ['medium', 'high']:
            budget_match = True
        if budget == 'medium' and gadget['budget'] in ['low', 'medium']:
            budget_match = True
            
        if not budget_match:
            continue
            
        # Must match at least one usage need
        if usage not in gadget['usage'] and 'general' not in gadget['usage']:
            continue
            
        recommendations.append(gadget)
        
    # Python-based sorting: preference to exact usage match, then price
    def sort_key(g):
        exact_match = usage in g['usage']
        # We negate the boolean to sort True (0) before False (1)
        return (not exact_match, g['price'])
        
    recommendations.sort(key=sort_key)
    
    return jsonify(recommendations)

if __name__ == '__main__':
    # Run the Flask development server on port 5000
    app.run(debug=True, port=5000)
