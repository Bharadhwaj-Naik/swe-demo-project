import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import FlashcardManager from "../../components/flashcards/FlashcardManager";
import PageHeader from "../../components/common/PageHeader";

const FlashcardPage = () => {
  const { id: documentId } = useParams();

  return (
    <div>
      <Link
        to={`/documents/${documentId}`}
        className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        Back to Document
      </Link>

      <PageHeader title="Flashcards" />
      <FlashcardManager documentId={documentId} />
    </div>
  );
};

export default FlashcardPage;
