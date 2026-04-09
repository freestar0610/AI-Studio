import { motion } from "motion/react";
import { Star } from "lucide-react";

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
];

export default function ReviewSection() {
  return (
    <section className="py-24 bg-white text-midnight">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">사용자 리얼 리뷰</h2>
          <p className="text-midnight/50 max-w-xl mx-auto">이미 수천 명의 사용자가 YOON Studio의 마법을 경험했습니다.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6">
                <img 
                  src={review.image} 
                  alt={review.user} 
                  className="w-full h-full object-cover"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
