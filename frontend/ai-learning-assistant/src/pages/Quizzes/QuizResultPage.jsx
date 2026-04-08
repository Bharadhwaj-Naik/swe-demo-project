import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import quizService from '../../services/quizService';
import PageHeader from '../../components/common/PageHeader';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Target, BookOpen } from 'lucide-react';

const QuizResultPage = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await quizService.getQuizResults(quizId);
        setResults(data);
      } catch (error) {
        toast.error('Failed to fetch quiz results.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (!results || !results.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-slate-600">Quiz results not found.</p>
        </div>
      </div>
    );
  }

  const { data: { quiz, results: detailedResults } } = results;
  const score = quiz.score;
  const totalQuestions = detailedResults.length;
  const correctAnswers = detailedResults.filter(r => r.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-emerald-500 to-teal-500';
    if (score >= 60) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-red-500';
  };

  const getScoreMessage = (score) => {
    if (score >= 90) return 'Outstanding! 🏆';
    if (score >= 80) return 'Great job! 🎉';
    if (score >= 70) return 'Good work! 👍';
    if (score >= 60) return 'Not bad! 💪';
    return 'Keep practicing! 📚';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back Button */}
      <div className="flex items-center">
        <Link
          to={`/documents/${quiz.document._id}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={2} />
          Back to Document
        </Link>
      </div>

      <PageHeader title={`${quiz.title || 'Quiz'} Results`} />

      {/* Score Card */}
      <div className="bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-2xl shadow-xl shadow-slate-200/20 overflow-hidden">
        <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600">
            <Trophy className="w-8 h-8" strokeWidth={2} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Your Score
            </p>
            <div className={`inline-block text-6xl md:text-7xl font-bold bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}>
              {score}%
            </div>
            <p className="text-lg font-medium text-slate-700 mt-2">
              {getScoreMessage(score)}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <Target className="w-4 h-4 text-slate-600" strokeWidth={2} />
            <span className="text-sm font-semibold text-slate-700">
              {totalQuestions} Total
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={2} />
            <span className="text-sm font-semibold text-emerald-700">
              {correctAnswers} Correct
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 rounded-xl shadow-sm">
            <XCircle className="w-4 h-4 text-rose-600" strokeWidth={2} />
            <span className="text-sm font-semibold text-rose-700">
              {incorrectAnswers} Incorrect
            </span>
          </div>
        </div>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-1 mb-6">
          <BookOpen className="w-5 h-5 text-slate-400" strokeWidth={2} />
          <h3 className="text-xl font-semibold text-slate-800">Detailed Review</h3>
        </div>

        {detailedResults.map((result, index) => {
          const userAnswerIndex = result.options.findIndex(opt => opt === result.selectedAnswer);
          const correctAnswerIndex = result.correctAnswer.startsWith('O')
            ? parseInt(result.correctAnswer.substring(1)) - 1
            : result.options.findIndex(opt => opt === result.correctAnswer);
          const isCorrect = result.isCorrect;

          return (
            <div
              key={index}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isCorrect ? 'border-emerald-100 hover:border-emerald-200' : 'border-rose-100 hover:border-rose-200'
              }`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex gap-4 sm:gap-6">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                    isCorrect
                      ? 'bg-emerald-50 border-2 border-emerald-200 text-emerald-600'
                      : 'bg-rose-50 border-2 border-rose-200 text-rose-600'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                    ) : (
                      <XCircle className="w-6 h-6" strokeWidth={2.5} />
                    )}
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                        Question {index + 1}
                      </span>
                      <h4 className="text-lg font-medium text-slate-800 leading-relaxed">
                        {result.question}
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {result.options.map((option, optIndex) => {
                        const isCorrectOption = optIndex === correctAnswerIndex;
                        const isUserAnswer = optIndex === userAnswerIndex;
                        const isWrongAnswer = isUserAnswer && !isCorrect;

                        return (
                          <div
                            key={optIndex}
                            className={`relative px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                              isCorrectOption
                                ? 'bg-emerald-50/50 border-emerald-500 text-emerald-700 shadow-sm'
                                : isWrongAnswer
                                ? 'bg-rose-50/50 border-rose-500 text-rose-700 shadow-sm'
                                : isUserAnswer
                                ? 'bg-slate-50 border-slate-300 text-slate-700'
                                : 'bg-white border-slate-100 text-slate-600'
                            }`}
                          >
                            <div className="flex-1">{option}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {result.explanation && (
                      <div className="p-4 bg-linear-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center mt-0.5">
                            <BookOpen className="w-4 h-4 text-slate-600" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                              Explanation
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {result.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="mt-8 flex justify-center">
        <Link to={`/documents/${quiz.document._id}`}>
          <button className="group relative px-8 h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
              Return to Document
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResultPage;
