import { useState } from "react";
import {
    Search,
    ChevronDown,
    ChevronUp,
    Mail,
    FileText,
    MessageCircle,
    Send,
    CheckCircle,
    ArrowLeft,
} from "lucide-react";

const faqCategories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "Getting Started" },
    { id: "products", label: "Products & Catalog" },
    { id: "linkgen", label: "Link Generator" },
    { id: "billing", label: "Payments & Billing" },
];

const faqData = [
    {
        category: "general",
        question: "How do I configure my merchant store details?",
        answer: "Go to the Settings page in your sidebar menu. Under 'Store Details', you can set your business name, contact owner, support email, phone number, and physical store address. Make sure to click 'Save All Settings' at the bottom to apply changes.",
    },
    {
        category: "general",
        question: "What is 'Order Auto-Acceptance'?",
        answer: "When enabled under the Settings -> Operations tab, our system automatically accepts all incoming customer orders immediately and notifies you. If disabled, you will need to manually review and accept/decline each order as it arrives.",
    },
    {
        category: "products",
        question: "How do I reorder category listings?",
        answer: "On the Category page, simply click and drag any row using the grip icon on the left side of the row. Drag it to your desired position and release it. The new order is automatically saved and updated on your public store page in real time.",
    },
    {
        category: "products",
        question: "What happens if a product goes out of stock?",
        answer: "You can edit the product and set its stock quantity to 0 or toggle its status. Active products with stock > 0 are displayed as available. Out-of-stock items will show as unavailable, preventing customers from ordering them.",
    },
    {
        category: "linkgen",
        question: "How does the Link Generator work?",
        answer: "The Link Generator compiles custom marketing and checkout links for your store. Select a page (like home, category, or a specific product) and click 'Generate'. You can then copy the URL, download a custom QR Code, or share it directly to social platforms to drive sales.",
    },
    {
        category: "linkgen",
        question: "Can I customize the generated QR Codes?",
        answer: "Yes, you can generate clean QR Codes in the Link Generator tool and customize color palettes, scan tracking parameters, and styles to fit your brand identity.",
    },
    {
        category: "billing",
        question: "How do I setup flat delivery charges?",
        answer: "Go to Settings -> Localization & Tax, and enter the amount in the 'Flat Delivery Fee' field. For instance, entering 50 will charge a flat ₹50 shipping fee on all orders below the minimum order value configuration.",
    },
];

export default function Support({ onNavigate }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Support Ticket Form State
    const [ticket, setTicket] = useState({ subject: "", category: "technical", message: "" });
    const [sending, setSending] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const toggleAccordion = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleTicketSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setSuccessMsg("");

        // Simulate API post
        setTimeout(() => {
            setSending(false);
            setSuccessMsg("Ticket submitted successfully! Our support agents will contact you within 24 hours.");
            setTicket({ subject: "", category: "technical", message: "" });
            setTimeout(() => setSuccessMsg(""), 5000);
        }, 1200);
    };

    const filteredFaq = faqData.filter((faq) => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const inputClass =
        "w-full rounded-xl border border-[#d0d5dd] dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-[#1a2231] dark:text-white placeholder-[#98a2b3] outline-none transition focus:border-[#1a2231] focus:ring-2 focus:ring-[#1a2231]/10 dark:focus:border-slate-400";

    return (
        <main className="p-5 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1a2231] dark:text-white">Support & Help</h1>
                        <p className="mt-1 text-sm text-[#667085] dark:text-slate-400">
                            Find answers, search FAQs, or open a support ticket with our merchant help desk.
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate?.("/merchant/dashboard")}
                        className="self-start inline-flex items-center gap-2 rounded-xl border border-[#e4e7ec] bg-white px-4 py-2 text-sm font-medium text-[#667085] hover:bg-[#f9fafb] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* FAQs Panel (Left 2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Search & Tabs Box */}
                        <div className="rounded-2xl border border-[#e4e7ec] bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
                            <div className="relative mb-5">
                                <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#98a2b3]" />
                                <input
                                    type="text"
                                    placeholder="Search frequently asked questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-xl border border-[#d0d5dd] dark:border-slate-700 bg-white dark:bg-slate-800 pl-11 pr-4 py-3 text-sm text-[#1a2231] dark:text-white placeholder-[#98a2b3] outline-none transition focus:border-[#1a2231] focus:ring-2 focus:ring-[#1a2231]/10 dark:focus:border-slate-400"
                                />
                            </div>

                            {/* Category Switcher Tabs */}
                            <div className="flex flex-wrap gap-1.5 border-b border-[#f2f4f7] pb-1 dark:border-slate-800">
                                {faqCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedCategory(cat.id);
                                            setExpandedIndex(null);
                                        }}
                                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                                            selectedCategory === cat.id
                                                ? "bg-[#1a2231] text-white shadow-sm dark:bg-white dark:text-[#1a2231]"
                                                : "text-[#667085] hover:bg-[#f2f4f7] hover:text-[#1a2231] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* FAQs Accordion */}
                        <div className="space-y-3.5">
                            {filteredFaq.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-[#e4e7ec] bg-white/50 p-12 text-center dark:border-slate-800">
                                    <p className="text-sm text-[#98a2b3] dark:text-slate-500">
                                        No FAQs match your search query. Try typing something else.
                                    </p>
                                </div>
                            ) : (
                                filteredFaq.map((faq, index) => {
                                    const isOpen = expandedIndex === index;
                                    return (
                                        <div
                                            key={index}
                                            className="rounded-2xl border border-[#e4e7ec] bg-white transition-all dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="flex w-full items-center justify-between px-5 py-4.5 text-left transition-colors hover:bg-[#f9fafb] dark:hover:bg-slate-800/40"
                                            >
                                                <span className="text-sm font-bold text-[#1a2231] dark:text-white">
                                                    {faq.question}
                                                </span>
                                                <span className="text-[#98a2b3] flex-shrink-0">
                                                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </span>
                                            </button>
                                            {isOpen && (
                                                <div className="border-t border-[#f2f4f7] px-5 py-4 dark:border-slate-800/80 bg-[#f9fafb]/50 dark:bg-slate-800/10">
                                                    <p className="text-sm leading-relaxed text-[#667085] dark:text-slate-300">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Quick Contact Cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <a
                                href="mailto:support@midrix.com"
                                className="group flex items-center gap-4 rounded-2xl border border-[#e4e7ec] bg-white p-5 hover:border-[#1a2231] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-white transition-all shadow-sm"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f6fb] dark:bg-slate-800 text-[#1a2231] dark:text-white group-hover:bg-[#1a2231] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#1a2231] transition-all">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#1a2231] dark:text-white">Email Help Desk</h4>
                                    <p className="text-xs text-[#98a2b3] mt-0.5">support@midrix.com</p>
                                </div>
                            </a>

                            <div className="group flex items-center gap-4 rounded-2xl border border-[#e4e7ec] bg-white p-5 hover:border-[#1a2231] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-white transition-all shadow-sm cursor-pointer">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f6fb] dark:bg-slate-800 text-[#1a2231] dark:text-white group-hover:bg-[#1a2231] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#1a2231] transition-all">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#1a2231] dark:text-white">Help Guides & Docs</h4>
                                    <p className="text-xs text-[#98a2b3] mt-0.5">Read core manual</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Ticket Sidebar (Right 1 column) */}
                    <div>
                        <div className="sticky top-6 rounded-2xl border border-[#e4e7ec] bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
                            <div>
                                <h3 className="text-base font-bold text-[#1a2231] dark:text-white flex items-center gap-2">
                                    <MessageCircle size={18} className="text-[#1a2231] dark:text-white" />
                                    Submit a Ticket
                                </h3>
                                <p className="text-xs text-[#98a2b3] mt-1">
                                    Submit a support ticket and our agents will respond back in 24 hours.
                                </p>
                            </div>

                            <form onSubmit={handleTicketSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Brief summary of issue"
                                        value={ticket.subject}
                                        onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400">
                                        Category
                                    </label>
                                    <select
                                        value={ticket.category}
                                        onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                                        className={inputClass}
                                    >
                                        <option value="technical">Technical Support</option>
                                        <option value="billing">Billing & Orders</option>
                                        <option value="account">Account Access</option>
                                        <option value="features">Feature Request</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400">
                                        Describe your issue
                                    </label>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="Provide all context or steps to reproduce..."
                                        value={ticket.message}
                                        onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                                        className={inputClass + " resize-none"}
                                    ></textarea>
                                </div>

                                {successMsg && (
                                    <div className="flex gap-2.5 rounded-xl border border-[#d1fadf] bg-[#ecfdf3] p-3.5 text-xs font-medium text-[#027a48] dark:border-green-900/50 dark:bg-green-950/20">
                                        <CheckCircle size={15} className="mt-0.5 flex-shrink-0" />
                                        <span>{successMsg}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a2231] hover:bg-[#344054] px-5 py-3 text-sm font-semibold text-white transition-all shadow-sm dark:bg-white dark:text-[#1a2231] dark:hover:bg-[#f2f4f7] disabled:opacity-50"
                                >
                                    {sending ? "Sending..." : (
                                        <>
                                            <Send size={15} />
                                            Send Support Ticket
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
