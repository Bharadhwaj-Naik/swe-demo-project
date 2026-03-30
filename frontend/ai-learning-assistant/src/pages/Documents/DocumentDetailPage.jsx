import React,{useState,useEffect} from "react";
import { useParams,Link} from "react-router-dom";
import documentService from "../../services/documentService";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";
import {ArrowLeft,ExternalLink} from 'lucide-react';
import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";

const DocumentDetailPage = () => {
    const {id} = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('content'); 

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const doc = await documentService.getDocument(id);
                setDocument(doc);
            } catch (error) {
                toast.error('Failed to fetch document.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, [id]);
        //Helper function to get the full URL of the document

    const getDocumentURL = (doc) => {
        if (!document?.data?.filePath) return null;
        const filePath = document.data.filePath;
        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            return filePath;
        }
        const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
        return `${baseURL}${filePath.startsWith('/') ? '' : '/'}${filePath}`;
    };
    const renderContent = () => {
        if(loading){
            return <Spinner/>;
        }
        if(!document || !document.data || !document.data.filePath){
            return <div className="">Document content not available</div>;
        }
        const pdfURL = getPdfURL();
        return (
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300">
                    <span className="text-sm font-medium text-gray-700">Document viewer</span>
                    <a href={pdfURL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        <ExternalLink size={16} />
                        open in new tab
                    </a>
                </div>
                <div className="bg-gray-100 p-1">
                <iframe
                     src={pdfURL}
                        title="pdf-viewer"
                        frameBorder="0"
                        className="w-full h-[70vh] bg-white rounded border border-gray-300"
                        style={{colorScheme : 'light' }}/>
            </div>
            </div>
        );
    };
           const renderChat = () => {
        return <ChatInterface/>;
           };
        const renderAIActions = () => {
        return <AIActions/>;
         };
       const renderFlashcardsTab = () => {
        return "render flashcards tab";
         };
         const renderQuizzesTab = () => {
        return "render quizzes tab";
            };
          const tabs = [
        { name: 'content', label: 'Content', render: renderContent()},
        { name: 'chat', label: 'Chat', render: renderchat()},
        { name: 'ai-actions', label: 'AI Actions', render: renderAIActions() },
        { name: 'flashcards', label: 'Flashcards', render: renderFlashcardsTab() },
        { name: 'quizzes', label: 'Quizzes', render: renderQuizzesTab() },
    ];
     if(loading){
        return <Spinner/>;
    }
    if(!document){
        return <div className="text-center p-8">
            Document not found.
        </div>;
    }
    return (
        <div>
           <div className="mb-4">
            <Link to="/documents" className="inline-flex items-center gap-2 text-sm text-nuetral-600 hover:text-neutral-900 transition-colors">
                <ArrowLeft size={16} />
                Back to Documents
            </Link>
            </div>
        <PageHeader title={document.data.title} />
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};
export default DocumentDetailPage
