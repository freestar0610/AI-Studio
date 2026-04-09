import { motion } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const reviews = [
  {
    id: 1,
    image: "https://picsum.photos/seed/rev1/400/500",
    product: "취업 증명 테마",
    rating: 5,
    text: "집에서 대충 찍은 사진이었는데, 정말 스튜디오에서 찍은 것처럼 완벽하게 나왔어요. 덕분에 원하던 곳에 합격했습니다!",
    user: "김*준 님",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/rev2/400/500",
    product: "데일리 화보 테마",
    rating: 5,
    text: "인스타그램 업로드용으로 사용했는데 반응이 너무 좋아요. AI라고 믿기지 않을 정도로 자연스러운 보정이 일품입니다.",
    user: "이*연 님",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/rev3/400/500",
    product: "부모님 기념 테마",
    rating: 5,
    text: "부모님 옛날 사진을 리마스터링 해드렸는데 눈물을 흘리시며 좋아하셨어요. 소중한 추억을 되찾아주셔서 감사합니다.",
    user: "박*훈 님",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/rev4/400/500",
    product: "프로필 화보 테마",
    rating: 5,
    text: "작가님이 찍어주신 것보다 더 마음에 들어요. 조명과 분위기가 정말 예술입니다. 다음에도 꼭 이용할게요!",
    user: "정*우 님",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/rev5/400/500",
    product: "커플 기념 테마",
    rating: 5,
    text: "기념일을 맞아 신청했는데 너무 만족스러워요. 둘 다 인생샷 건졌습니다. 보정 강도 조절도 가능해서 좋았어요.",
    user: "최*아 님",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/rev6/400/500",
    product: "반려동물 테마",
    rating: 5,
    text: "우리 강아지 사진이 이렇게 멋지게 변할 줄 몰랐어요. 털 질감 하나하나 살아있어서 감동받았습니다.",
    user: "강*민 님",
  },
];

export default function ReviewSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-white text-midnight overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">사용자 리얼 리뷰</h2>
          <p className="text-midnight/50 max-w-xl mx-auto">이미 수천 명의 사용자가 YOON Studio의 마법을 경험했습니다.</p>
        </div>
      </div>

      <div 
        className="relative flex overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: isPaused ? undefined : ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="min-w-[320px] md:min-w-[400px] bg-gray-50 rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col whitespace-normal"
            >
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6">
                <img 
                  src={review.image} 
                  alt={review.user} 
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider text-gold border border-gold/20">
                  이용상품: {review.product}
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-6 flex-grow italic text-midnight/80">
                "{review.text}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <span className="font-bold text-sm">{review.user}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Review</span>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Overlays for smooth fade effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
