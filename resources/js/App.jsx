import { useEffect, useState } from "react";
import Sidebar from "./pages/Sidebar";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import CategoryCreate from "./pages/CategoryCreate";
import CategoryForm from "./pages/CategoryForm";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const menuByPath = {
    "/merchant/dashboard": "Dashboard",
    "/merchant/category": "Category",
    "/merchant/category/create": "Category",
    "/merchant/category/edit": "Category",
    "/merchant/product": "Product",
    "/merchant/product/create": "Product",
};

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    const navigate = (path) => {
        if (!path || path === "#" || path === currentPath) return;
        window.history.pushState({}, "", path);
        setCurrentPath(path);
        setSidebarOpen(false);
    };

    useEffect(() => {
        const onPopState = () => setCurrentPath(window.location.pathname);
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    // ── Auth pages (no shell) ──────────────────────────────────────
    if (currentPath === "/merchant/signin") return <SignIn onNavigate={navigate} />;
    if (currentPath === "/merchant/signup") return <SignUp onNavigate={navigate} />;

    // ── Admin shell ────────────────────────────────────────────────
    const selectedMenu = currentPath.startsWith("/merchant/product/edit/")
        ? "Product"
        : currentPath.startsWith("/merchant/category/edit/")
            ? "Category"
            : menuByPath[currentPath] ?? "Dashboard";

    const renderPage = () => {
        if (currentPath === "/merchant/category/create") return <CategoryCreate onNavigate={navigate} />;
        if (currentPath.startsWith("/merchant/category/edit/")) {
            const categoryId = currentPath.split("/").pop();
            return <CategoryForm mode="edit" categoryId={categoryId} onNavigate={navigate} />;
        }
        if (currentPath === "/merchant/category") return <Category onNavigate={navigate} />;
        if (currentPath === "/merchant/product/create") return <ProductForm mode="create" onNavigate={navigate} />;
        if (currentPath.startsWith("/merchant/product/edit/")) {
            const productId = currentPath.split("/").pop();
            return <ProductForm mode="edit" productId={productId} onNavigate={navigate} />;
        }
        if (currentPath === "/merchant/product") return <Product onNavigate={navigate} />;
        return <Dashboard />;
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="flex h-screen overflow-hidden bg-[#f4f6fb] text-[#1a2231] dark:bg-[#0f1117] dark:text-slate-100">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    selectedMenu={selectedMenu}
                    onNavigate={navigate}
                />

                <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
                    <Header
                        selectedMenu={selectedMenu}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        onMenuClick={() => setSidebarOpen(true)}
                    />
                    <div className="flex-1 overflow-y-auto">
                        {renderPage()}
                    </div>
                </div>
            </div>
        </div>
    );
}
