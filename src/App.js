import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Product from './page/Product/Product'
import Invoice from './page/Invoice/Invoice'

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Product />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/invoice" element={<Invoice />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
