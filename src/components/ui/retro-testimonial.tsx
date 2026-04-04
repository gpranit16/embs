"use client";

import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowLeft, ArrowRight, Quote, X} from "lucide-react";
import {cn} from "@/lib/utils";

// Mock Next/Image since we are in Vite
const Image = (props: any) => <img {...props} />;

export interface iTestimonial {
	name: string;
	designation: string;
	description: string;
	profileImage: string;
}

interface iCarouselProps {
	items: React.ReactElement<{
		testimonial: iTestimonial;
		index: number;
		layout?: boolean;
		onCardClose: () => void;
	}>[];
	initialScroll?: number;
}

const useOutsideClick = (
	ref: React.RefObject<HTMLDivElement | null>,
	onOutsideClick: () => void,
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			onOutsideClick();
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
	}, [ref, onOutsideClick]);
};

const Carousel = ({items, initialScroll = 0}: iCarouselProps) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(true);

	const checkScrollability = () => {
		if (carouselRef.current) {
			const {scrollLeft, scrollWidth, clientWidth} = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const handleScrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({left: -300, behavior: "smooth"});
		}
	};

	const handleScrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({left: 300, behavior: "smooth"});
		}
	};

	const handleCardClose = (index: number) => {
		if (carouselRef.current) {
			const cardWidth = isMobile() ? 230 : 384;
			const gap = isMobile() ? 4 : 8;
			const scrollPosition = (cardWidth + gap) * (index + 1);
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
		}
	};

	const isMobile = () => {
		return window && window.innerWidth < 768;
	};

	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			checkScrollability();
		}
	}, [initialScroll]);

	return (
		<div className="relative w-full mt-10">
			<div
				className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5"
				ref={carouselRef}
				onScroll={checkScrollability}
			>
				<div
					className={cn(
						"absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
					)}
				/>
				<div
					className={cn(
						"flex flex-row justify-start gap-4 pl-3",
						"max-w-5xl mx-auto",
					)}
				>
					{items.map((item, index) => {
						return (
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.2 * index,
										ease: "easeOut",
									},
								}}
								key={`card-${index}`}
								className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
							>
								{React.cloneElement(item, {
									onCardClose: () => {
										return handleCardClose(index);
									},
								})}
							</motion.div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-end gap-2 mt-4 pr-10">
				<button
					className="relative z-40 h-12 w-12 rounded-full border border-[rgba(0,217,172,0.5)] bg-[rgba(4,24,50,0.8)] flex items-center justify-center disabled:opacity-50 hover:bg-[rgba(0,217,172,0.3)] transition-colors duration-200"
					onClick={handleScrollLeft}
					disabled={!canScrollLeft}
				>
					<ArrowLeft className="h-6 w-6 text-teal-400" />
				</button>
				<button
					className="relative z-40 h-12 w-12 rounded-full border border-[rgba(0,217,172,0.5)] bg-[rgba(4,24,50,0.8)] flex items-center justify-center disabled:opacity-50 hover:bg-[rgba(0,217,172,0.3)] transition-colors duration-200"
					onClick={handleScrollRight}
					disabled={!canScrollRight}
				>
					<ArrowRight className="h-6 w-6 text-teal-400" />
				</button>
			</div>
		</div>
	);
};

const TestimonialCard = ({
	testimonial,
	layout = false,
	onCardClose = () => {},
	backgroundImage = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60",
}: {
	testimonial: iTestimonial;
	layout?: boolean;
	onCardClose?: () => void;
	backgroundImage?: string;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleExpand = () => {
		return setIsExpanded(true);
	};
	const handleCollapse = () => {
		setIsExpanded(false);
		onCardClose();
	};

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleCollapse();
			}
		};

		if (isExpanded) {
			const scrollY = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = "100%";
			document.body.style.overflow = "hidden";
			document.body.dataset.scrollY = scrollY.toString();
		} else {
			const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
			document.body.style.overflow = "";
			window.scrollTo({top: scrollY, behavior: "instant"});
		}

		window.addEventListener("keydown", handleEscapeKey);
		return () => {
			return window.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isExpanded]);

	useOutsideClick(containerRef, handleCollapse);

	return (
		<>
			<AnimatePresence>
				{isExpanded && (
					<div className="fixed inset-0 h-screen overflow-hidden z-50">
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 1}}
							exit={{opacity: 0}}
							className="bg-black/90 backdrop-blur-xl h-full w-full fixed inset-0"
						/>
						<motion.div
							initial={{opacity: 0, scale: 0.9}}
							animate={{opacity: 1, scale: 1}}
							exit={{opacity: 0, scale: 0.9}}
							ref={containerRef}
							layoutId={layout ? `card-${testimonial.name}` : undefined}
							className="w-[92vw] max-w-3xl mx-auto bg-gradient-to-b from-[#020C18] to-[#01142A] border border-[rgba(0,217,172,0.3)] h-[85vh] md:h-[80vh] z-[60] p-6 md:p-10 rounded-3xl relative mt-[7.5vh] md:mt-[10vh] shadow-[0_0_50px_rgba(0,-217,172,0.2)] flex flex-col justify-center"
						>
							<button
								className="absolute top-6 right-6 h-10 w-10 rounded-full flex items-center justify-center bg-[rgba(0,217,172,0.2)] hover:bg-[rgba(0,217,172,0.4)] transition"
								onClick={handleCollapse}
							>
								<X className="h-6 w-6 text-teal-400" />
							</button>
							<div className="flex items-center gap-6 mb-8 mt-10">
								<ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
								<div>
									<motion.p
										layoutId={layout ? `title-${testimonial.name}` : undefined}
										className="text-3xl md:text-5xl font-bold text-white mb-2"
									>
										{testimonial.name}
									</motion.p>
									<motion.p
										layoutId={layout ? `category-${testimonial.name}` : undefined}
										className="text-xl text-teal-400 opacity-90"
									>
										{testimonial.designation}
									</motion.p>
								</div>
							</div>
							<div className="py-2 md:py-4 text-[rgba(238,244,250,0.9)] text-lg md:text-2xl font-light leading-relaxed overflow-y-auto">
								<Quote className="h-6 w-6 md:h-8 md:w-8 text-teal-400/50 mb-2 inline-block -ml-2 mr-2" />
								{testimonial.description}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<motion.button
				layoutId={layout ? `card-${testimonial.name}` : undefined}
				onClick={handleExpand}
				className=""
				whileHover={{
					y: -10,
					transition: {duration: 0.3, ease: "easeOut"},
				}}
			>
				<div
					className={`rounded-3xl bg-gradient-to-b from-[#020C18] to-[rgba(4,24,50,0.9)] border border-[rgba(0,217,172,0.2)] h-[400px] w-72 md:w-80 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group`}
				>
					<div className="absolute opacity-20 group-hover:opacity-40 transition-opacity duration-700" style={{inset: "-1px 0 0"}}>
						<div className="absolute inset-0">
							<Image
								className="block w-full h-full object-center object-cover transition-transform duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
								src={backgroundImage}
								alt="Background layer"
							/>
						</div>
					</div>
					<ProfileImage src={testimonial.profileImage} alt={testimonial.name} />
					<motion.p
						layoutId={layout ? `category-${testimonial.name}` : undefined}
						className="text-white text-2xl font-bold text-center mt-6 z-20"
					>
						{testimonial.name}
					</motion.p>
					<motion.p
						layoutId={layout ? `category-${testimonial.name}` : undefined}
						className="text-teal-400 text-sm font-medium uppercase tracking-widest text-center mt-2 z-20"
					>
						{testimonial.designation}
					</motion.p>
					<motion.p
						layoutId={layout ? `title-${testimonial.name}` : undefined}
						className="text-[rgba(238,244,250,0.7)] text-sm font-normal text-center mt-4 px-6 z-20"
					>
						{testimonial.description.length > 80
							? `${testimonial.description.slice(0, 80)}...`
							: testimonial.description}
					</motion.p>
				</div>
			</motion.button>
		</>
	);
};

const ProfileImage = ({src, alt, ...rest}: any) => {
	const [isLoading, setLoading] = useState(true);

	return (
		<div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] overflow-hidden rounded-2xl border-[3px] border-solid border-teal-500/50 flex-none relative z-20 shadow-[0_0_20px_rgba(0,217,172,0.4)]">
			<Image
				className={cn(
					"transition duration-500 absolute top-0 inset-0 w-full h-full object-cover object-center z-50",
					isLoading ? "blur-sm" : "blur-0",
				)}
				onLoad={() => {
					return setLoading(false);
				}}
				src={src}
				loading="lazy"
				decoding="async"
				alt={alt || "Profile image"}
				{...rest}
			/>
		</div>
	);
};

export {Carousel, TestimonialCard, ProfileImage};
