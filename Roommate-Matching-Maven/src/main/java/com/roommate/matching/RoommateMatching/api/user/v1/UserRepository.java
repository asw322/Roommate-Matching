package com.roommate.matching.RoommateMatching.api.user.v1;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<UserItem, Long> {
	Optional<UserItem> findByEmail(final String email);
	Optional<UserItem> findByResetToken(final String resetToken);
	List<UserItem> findAllByEnabled(final boolean enabled);

	@Modifying(flushAutomatically = true)
	@Query("update UserItem u set u.firstName = ?2, u.lastName = ?3 where u.id = ?1")
	void setUserInfoById(final Long id, final String firstName, final String lastName);

	@Modifying(flushAutomatically = true)
	@Query("update UserItem u set u.oidcToken = ?2 where u.id = ?1")
	void setUserOidcToken(final Long id, final String oidcToken);
}